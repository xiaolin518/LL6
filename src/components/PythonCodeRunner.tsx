import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, RefreshCw, Loader2 } from 'lucide-react';

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
  const stdoutRef = useRef('');

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
        await pyodide.loadPackage(['pandas', 'numpy', 'matplotlib']);
        
        pyodideRef.current = pyodide;
        
        pyodide.runPython(`
          import sys
          from io import StringIO
          original_stdout = sys.stdout
        `);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load Pyodide:', error);
        setOutput(`加载Python环境失败: ${error}`);
        setIsLoading(false);
      }
    };

    if (typeof window !== 'undefined' && !(window as any).pyodide) {
      loadPyodide();
    }
  }, []);

  const runCode = useCallback(async () => {
    if (!pyodideRef.current || isRunning) return;
    
    setIsRunning(true);
    setOutput('');
    stdoutRef.current = '';

    try {
      const fullCode = `
import sys
from io import StringIO

sys.stdout = StringIO()
${code}
sys.stdout.seek(0)
result = sys.stdout.read()
sys.stdout = __import__('sys').stdout
result
`;

      const result = await pyodideRef.current.runPythonAsync(fullCode);
      const outputStr = typeof result === 'string' ? result : result.toString();
      setOutput(outputStr);
    } catch (error: any) {
      setOutput(`执行错误: ${error.message || error}`);
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

  return (
    <div className="bg-gray-900 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white font-medium">代码编辑器</h3>
        <div className="flex gap-2">
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
          <div className="flex items-center gap-2 text-white">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>正在加载Python环境...</span>
          </div>
        </div>
      ) : (
        <>
          <textarea
            value={code}
            onChange={handleCodeChange}
            disabled={isRunning}
            className="w-full h-64 bg-gray-800 text-green-400 p-4 rounded border border-gray-700 font-mono text-sm resize-none disabled:opacity-70"
            placeholder="请输入Python代码..."
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
        <div className="bg-gray-800 p-4 rounded-lg min-h-24">
          <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
            {output || '运行代码后显示结果'}
          </pre>
        </div>
      </div>
    </div>
  );
}