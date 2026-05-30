import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, RefreshCw, Loader2, Code2 } from 'lucide-react';

interface PythonCodeRunnerProps {
  initialCode: string;
  onCodeChange: (code: string) => void;
}

export default function PythonCodeRunner({ initialCode, onCodeChange }: PythonCodeRunnerProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pyodideRef = useRef<any>(null);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  useEffect(() => {
    const loadPyodide = async () => {
      try {
        setIsLoading(true);
        const pyodide = await (window as any).loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/"
        });
        
        pyodideRef.current = pyodide;
        setIsLoading(false);
        setOutput('Python环境加载成功！现在可以运行代码了。');
      } catch (error) {
        console.error('Failed to load Pyodide:', error);
        setOutput(`加载Python环境失败: ${error}\n\n请刷新页面重试。`);
        setIsLoading(false);
      }
    };

    if (typeof window !== 'undefined' && !pyodideRef.current) {
      loadPyodide();
    }
  }, []);

  const runCode = useCallback(async () => {
    if (!pyodideRef.current || isRunning) return;
    
    setIsRunning(true);
    setOutput('');

    try {
      const pyodide = pyodideRef.current;
      
      pyodide.runPython(`
import sys
from io import StringIO
_output_buffer = StringIO()
sys.stdout = _output_buffer
sys.stderr = _output_buffer
`);

      try {
        await pyodide.runPythonAsync(code);
      } catch (e) {
        pyodide.runPython(`
import traceback
traceback.print_exc()
`);
      }

      const result = pyodide.runPython(`
_output_buffer.seek(0)
_output_buffer.read()
`);

      pyodide.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
del _output_buffer
`);

      const outputStr = typeof result === 'string' ? result : String(result);
      setOutput(outputStr || '代码执行完成（无输出）');
    } catch (error: any) {
      setOutput(`执行错误: ${error.message || String(error)}`);
    } finally {
      setIsRunning(false);
    }
  }, [code, isRunning]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onCodeChange(newCode);
  };

  const handleReset = () => {
    setCode(initialCode);
    onCodeChange(initialCode);
    setOutput('');
  };

  const loadExampleCode = () => {
    const examples = [
      `# Hello World 示例
print("Hello, World!")
print("欢迎使用Python在线编辑器！")`,
      
      `# 简单计算
a = 10
b = 20
print(f"{a} + {b} =", a + b)
print(f"{a} × {b} =", a * b)`,
      
      `# 循环和列表
numbers = [1, 2, 3, 4, 5]
for n in numbers:
    print(f"{n} 的平方是: {n*n}")`,
      
      `# 函数定义
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        print(a, end=' ')
        a, b = b, a + b

print("斐波那契数列前10项:")
fibonacci(10)`,
      
      `# 字典操作
student = {
    "姓名": "张三",
    "年龄": 18,
    "课程": ["数学", "英语", "编程"]
}

for key, value in student.items():
    print(f"{key}: {value}")`
    ];
    
    const randomExample = examples[Math.floor(Math.random() * examples.length)];
    setCode(randomExample);
    onCodeChange(randomExample);
    setOutput('已加载示例代码，点击运行试试看！');
  };

  return (
    <div className="bg-gray-900 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <h3 className="text-white font-medium flex items-center gap-2">
          <Code2 className="w-5 h-5" />
          Python 代码编辑器
        </h3>
        <div className="flex gap-2">
          <button
            onClick={loadExampleCode}
            disabled={isLoading || isRunning}
            className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-500 text-sm flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            示例代码
          </button>
          <button
            onClick={handleReset}
            disabled={isLoading || isRunning}
            className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 text-sm flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className="w-3 h-3" />
            重置
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="h-64 bg-gray-800 rounded border border-gray-700 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-white">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span>正在加载Python环境... (首次加载约10-15秒)</span>
            <span className="text-sm text-gray-400">正在下载必要的组件...</span>
          </div>
        </div>
      ) : (
        <>
          <textarea
            value={code}
            onChange={handleCodeChange}
            disabled={isRunning}
            className="w-full h-64 bg-gray-800 text-green-400 p-4 rounded border border-gray-700 font-mono text-sm resize-none disabled:opacity-70 focus:outline-none focus:border-blue-500"
            placeholder="请输入Python代码...\n\n你可以运行任何Python代码！\n\n示例：\nprint('Hello World')\n\nfor i in range(5):\n    print(i)"
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={runCode}
              disabled={isRunning}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  运行中...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  运行代码
                </>
              )}
            </button>
          </div>
        </>
      )}
      
      <div className="mt-4">
        <h3 className="text-white font-medium mb-2">输出结果</h3>
        <div className="bg-gray-800 p-4 rounded-lg min-h-40 max-h-80 overflow-y-auto">
          <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
            {output || '运行代码后显示结果'}
          </pre>
        </div>
      </div>
    </div>
  );
}
