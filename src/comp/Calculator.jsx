import { useState } from 'react';
import Lottie from 'lottie-react';
import snowAnim from '../animation/Snow.json';

function Calculator() {
    const [input, setInput] = useState('');
    const buttons = ['1', '2', '3', '/', '4', '5', '6', '*', '7', '8', '9', '-', '0', '.', '+', 'C', '='];

    const handleClick = (btn) => {
        const operators = ['+', '-', '*', '/'];
        if (btn === 'C') {
            setInput('');
        } else if (btn === '=') {
            if (input.trim() === '' || operators.includes(input.slice(-1))) {
                return;
            }
            try {
                const result = eval(input);
                setInput(parseFloat(result.toFixed(10)).toString());
            } catch (err) {
                setInput('Error');
            }
        } else if (operators.includes(btn)) {
            if (input === '' || operators.includes(input.slice(-1))) {
                return;
            }
            setInput(input + btn);
        } else if (btn === '.') {
            const lastChar = input.slice(-1);
            if (lastChar === '.' || input === '') return;
            setInput(input + btn);
        } else {
            if (input === '0' && btn !== '.') {
                setInput(btn);
            } else {
                setInput(input + btn);
            }
        }
    };

    return (
        <div className="relative h-screen overflow-hidden bg-gradient-to-br from-[#001f33] to-[#00334d] flex items-center justify-center">
            <Lottie
                animationData={snowAnim}
                loop={true}
                className="absolute -top-10 left-0 w-full h-[900px] z-0 opacity-50 pointer-events-none"
            />
            <div className="relative z-10 w-[320px] bg-[#0f172a] rounded-2xl p-6 shadow-2xl shadow-black/40 border border-sky-700/30">
                <input
                    value={input}
                    readOnly
                    type="text"
                    className="bg-slate-200 w-full rounded-lg h-12 mt-2 px-4 text-right text-xl font-semibold text-gray-900"
                />
                <div className="grid grid-cols-4 gap-4 mt-6">
                    {buttons.map((btn, i) => (
                        <button
                            key={i}
                            onClick={() => handleClick(btn)}
                            className={`rounded-xl py-4 text-xl font-semibold shadow-md cursor-pointer transition duration-200
                            ${btn === 'C'
                                    ? 'bg-sky-600 hover:bg-sky-500 text-white col-span-1'
                                    : btn === '='
                                        ? 'bg-cyan-500 hover:bg-cyan-400 text-white col-span-2 w-[270px]'
                                        : ['/', '*', '-', '+'].includes(btn)
                                            ? 'bg-blue-700 hover:bg-blue-600 text-white'
                                            : 'bg-slate-100 hover:bg-slate-200 text-gray-900'
                                }`}
                        >
                            {btn}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Calculator;
