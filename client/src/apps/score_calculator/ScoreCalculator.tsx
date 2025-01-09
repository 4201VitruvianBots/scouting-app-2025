//import ToggleButton from '../../components/ToggleButton'
import React, { Dispatch, SetStateAction, useState } from 'react';

import LinkButton from '../../components/LinkButton';
import { MaterialSymbol } from 'react-material-symbols';
import NumberInput from '../../components/NumberInput';

function Counter({
    value,
    onChange,
    children,
}: {
    value: number;
    onChange: Dispatch<SetStateAction<number>>;
    children: string;
}) {
    return (
        <>
            <button
                className='text-md my-2 rounded-l-lg bg-red-400 px-4 py-2 text-zinc-100 active:brightness-75'
                onClick={() => onChange(value > 0 ? value - 1 : value)}>
                -
            </button>
            <button
                className='text-md min-w-55 my-2 rounded-r-lg bg-slate-600 px-3  py-2 text-zinc-100 active:brightness-75'
                onClick={() => onChange(value + 1)}>
                + {children} ({value})
            </button>
        </>
    );
}

function ScoreCalculator() {
    const [autoLeave, setAutoLeave] = useState(0);
    const [autoCoral, setAutoCoral] = useState(0);
    const [autoAlgaeProcessor, setAutoAlgaeProcessor] = useState(0);
    const [teleCoral, setTeleCoral] = useState(0);
    const [AlgaeProcessoredTeleCoral, setAlgaeProcessoredTeleCoral] = useState(0);
    const [teleAlgaeProcessor, setTeleAlgaeProcessor] = useState(0);
    const [park, setPark] = useState(0);
    const [Deep, setDeep] = useState(0);
    const [Shallow, setShallow] = useState(0);
    const [trap, setTrap] = useState(0);
    const [harmony, setHarmony] = useState(0);

    const [foulPoints, setFoulPoints] = useState<number | undefined>(0);

    const autoPoints = autoLeave * 2;
    const CoralPoints =
        autoCoral * 5 + teleCoral * 2 + AlgaeProcessoredTeleCoral * 5;
    const AlgaeProcessorPoints = autoAlgaeProcessor * 2 + teleAlgaeProcessor * 1;
    const stagePoints =
        park * 1 + Deep * 3 + Shallow * 4 + trap * 5 + harmony * 2;
    const totalPoints =
        autoPoints +
        CoralPoints +
        AlgaeProcessorPoints +
        stagePoints +
        (foulPoints ?? 0);

    const handleReset = () => {
        setAutoLeave(0);
        setAutoCoral(0);
        setAutoAlgaeProcessor(0);
        setTeleCoral(0);
        setAlgaeProcessoredTeleCoral(0);
        setTeleAlgaeProcessor(0);
        setPark(0);
        setDeep(0);
        setShallow(0);
        setTrap(0);
        setHarmony(0);
        setFoulPoints(0);
    };

    return (
        <div className='flex h-dvh flex-col'>
            <div className='mb-2 bg-gray-800'>
                <br />
                <h1 className='mb-4 text-center text-3xl  font-bold text-[#48c55c]'>
                    Score Calculator
                </h1>
            </div>

            <div className='fixed left-4 top-4 z-20  flex flex-col gap-2 rounded-md bg-slate-200 p-1'>
                <LinkButton link='/' className='snap-none'>
                    <MaterialSymbol
                        icon='home'
                        size={50}
                        fill
                        grade={200}
                        color='green'
                        className='snap-none'
                    />
                </LinkButton>
            </div>

            <div className='flex flex-grow flex-col'>
                <button
                    onClick={handleReset}
                    className='text-md col-span-2 mx-2 rounded-md  bg-blue-400/70 px-3 py-2 text-black active:brightness-75'>
                    Reset All
                </button>
                <div className='flex flex-grow snap-x snap-mandatory flex-row gap-2 overflow-x-auto p-2 *:flex-shrink-0'>
                    <div className='grid w-[calc(100%_-_1rem)] snap-center snap-always auto-rows-fr grid-cols-[auto_1fr] grid-rows-[auto] gap-1 md:w-auto md:flex-grow md:basis-0'>
                        <h2 className='col-span-2 text-center text-xl font-bold text-green-600'>
                            Auto
                        </h2>
                        <Counter value={autoLeave} onChange={setAutoLeave}>
                            Auto Leave
                        </Counter>
                        <Counter value={autoCoral} onChange={setAutoCoral}>
                            Auto Coral
                        </Counter>
                        <Counter value={autoAlgaeProcessor} onChange={setAutoAlgaeProcessor}>
                            Auto AlgaeProcessor
                        </Counter>
                    </div>
                    <div className='grid w-[calc(100%_-_2rem)] snap-center snap-always auto-rows-fr grid-cols-[auto_1fr] grid-rows-[auto] gap-1 md:w-auto md:flex-grow md:basis-0'>
                        <h2 className='col-span-2 text-center text-xl font-bold text-green-600'>
                            Teleop
                        </h2>
                        <Counter value={teleCoral} onChange={setTeleCoral}>
                            Tele Coral
                        </Counter>
                        <Counter
                            value={AlgaeProcessoredTeleCoral}
                            onChange={setAlgaeProcessoredTeleCoral}>
                            AlgaeProcessored Tele Coral
                        </Counter>

                        <Counter value={teleAlgaeProcessor} onChange={setTeleAlgaeProcessor}>
                            Tele AlgaeProcessor
                        </Counter>
                    </div>

                    <div className='grid w-[calc(100%_-_1rem)] snap-center snap-always auto-rows-fr  grid-cols-[auto_1fr] grid-rows-[auto]  gap-1 md:w-auto md:flex-grow md:basis-0'>
                        <h2 className='col-span-2 text-center text-xl font-bold text-green-600'>
                            Endgame
                        </h2>
                        <Counter value={park} onChange={setPark}>
                            Park
                        </Counter>
                        <Counter value={Deep} onChange={setDeep}>
                            Deep
                        </Counter>
                        <Counter value={Shallow} onChange={setShallow}>
                            Spotlit Deep
                        </Counter>
                        <Counter value={trap} onChange={setTrap}>
                            Trap
                        </Counter>
                        <Counter value={harmony} onChange={setHarmony}>
                            Harmonies
                        </Counter>
                    </div>
                </div>

                <div className='col-span-2 grid grid-cols-2 justify-center gap-2 bg-slate-200 p-3'>
                    <p className='text-black-100 text-md rounded-md border-green-800 bg-green-400/70 px-3 py-2 text-center'>
                        Leave:{' '}
                        <span className='rounded-lg bg-black/15 p-2 py-1'>
                            {autoPoints}
                        </span>
                    </p>

                    <p
                        className={` text-black-100 text-md rounded-md border-green-800 bg-green-400/70 px-3 py-2 text-center`}>
                        Coral:{' '}
                        <span className='rounded-lg bg-black/15 p-2 py-1'>
                            {CoralPoints}
                        </span>
                    </p>

                    <p className='text-black-100 text-md rounded-md border-green-800 bg-green-400/70 px-3 py-2 text-center'>
                        AlgaeProcessor:{' '}
                        <span className='rounded-lg bg-black/15 p-2 py-1'>
                            {AlgaeProcessorPoints}
                        </span>
                    </p>

                    <p className='text-black-100 text-md rounded-md border-green-800 bg-green-400/70 px-3 py-2 text-center'>
                        Stage:{' '}
                        <span className='rounded-lg bg-black/15 p-2 py-1'>
                            {stagePoints}
                        </span>
                    </p>

                    <p className='text-black-100 text-md rounded-md border-green-800 bg-green-400/70 px-3 py-2 text-center'>
                        Foul Points:{' '}
                        <NumberInput
                            className='w-16 rounded-lg bg-black/15 p-2 py-1 text-center'
                            value={foulPoints}
                            onChange={setFoulPoints}
                        />
                    </p>

                    <p className='text-black-100 text-md rounded-md border-green-800 bg-green-400/70 px-3 py-2 text-center font-black'>
                        Total:{' '}
                        <span className='rounded-lg bg-black/15 p-2 py-1'>
                            {totalPoints}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ScoreCalculator;
