import {
    MatchDataAggregations,
    MatchSchedule,
    SuperDataAggregations,
} from 'requests';
import LinkButton from '../../components/LinkButton';
import { useFetchJson } from '../../lib/useFetch';
import { useEffect, useState } from 'react';
import { MaterialSymbol } from 'react-material-symbols';
import TeamDropdown from '../../components/TeamDropdown';
import scheduleJson from '../../assets/matchSchedule.json';

import BarChartWIP from './components/BarchartWIP';

const schedule = scheduleJson as MatchSchedule;

// const matchStats: Exclude<keyof MatchDataAggregations, '_id'>[] = [
//     'averageTeleCoral',
//     'averageTeleAlgaeProcessor',
//     'averageAutoCoral',
//     'averageAutoAlgaeProcessor',
//     'averageAutoAlgaeRobotNet',
//     'maxTeleCoral',
//     'maxTeleAlgaeProcessor',
//     'maxTeleAlgaeRobotNet',
//     'maxAutoCoral',
//     'maxAutoAlgaeProcessor',
//     'maxAutoAlgaeRobotNet',
//     'maxCoral',
//     'maxAlgaeProcessor',
//     'maxAlgaeRobotNet',
//     'avgClimbRate'
// ];

// const superStats: Exclude<keyof SuperDataAggregations, '_id'>[] = [
//     'avgFouls',
//     'maxFouls',
// ];

function ReconApp() {
    const [retrieveMatch, reloadRetrieveMatch] =
        useFetchJson<MatchDataAggregations[]>('/data/retrieve');
    const [retrieveSuper, reloadRetrieveSuper] = useFetchJson<
        SuperDataAggregations[]
    >('/data/retrieve/super');
    const [matchNumber, setMatchNumber] = useState<number>();
    const [teams, setTeams] = useState<(number | undefined)[]>([undefined]);
    const [teamNumber, setTeamNumber] = useState(Number);

    useEffect(() => {
        if (!matchNumber) return;
        const match = schedule?.[matchNumber];
        if (!match) return;
        setTeams([
            match.red_1,
            match.red_2,
            match.red_3,
            match.blue_1,
            match.blue_2,
            match.blue_3,
        ]);
    }, [matchNumber]);

    return (
        <div className='h-auto min-h-fit border-4 border-[#171c26] bg-[#171c26]'>
            <main className='mx-auto mb-5 flex h-full grid-flow-row flex-col content-center items-center justify-center bg-[#171c26] bg-repeat text-white'>
                <h1 className='my-8 text-center text-3xl font-bold text-[#48c55c]'>
                    Recon Interface
                </h1>

                <div className='fixed left-4 top-4 z-20  flex flex-col gap-2 rounded-md p-2'>
                    <LinkButton link='/' className='snap-none'>
                        <MaterialSymbol
                            icon='home'
                            size={60}
                            fill
                            grade={200}
                            color='green'
                            className='snap-none'
                        />
                    </LinkButton>
                </div>
                <p className='mb-2 text-2xl text-white'>Team Number</p>
                <TeamDropdown onChange={setTeamNumber} value={teamNumber} />
                <button
                    className='mb-10 mt-5 rounded-lg border-2 border-slate-900 text-lg'
                    onClick={() => {
                        reloadRetrieveMatch();
                        reloadRetrieveSuper();
                    }}>
                    Reload Data
                </button>
                <div className='grid gap-10 grid-cols-4 w-full'>

                    <div className='col-span-2 ml-auto mr-20 rounded-lg border-2 border-gray-800 bg-gray-800 p-4 w-full'>
                        <img
                            src={`/image/${teamNumber}.jpeg`}
                            width='100px'
                            height='100px'
                            alt=''
                            className='items-center text-center h-[300px] w-[500px]'
                        />
                    </div>

                    <div className='col-span-2 w-full items-center justify-center rounded-lg border-2 border-gray-800 bg-gray-800 p-4'>
                        <BarChartWIP></BarChartWIP>
                    </div>

                <div className='justify mt-6 h-80 w-full col-span-2 items-center rounded-lg border-2 border-gray-800 bg-gray-800 p-4'>
                    <h3 className='text-3xl font-bold'>Autos</h3>
                </div>
                <div className='justify h-80 w-full col-span-1 col-start-3 mt-6 rounded-lg border-2 border-gray-800 bg-gray-800'>
                    <h3 className='text-3xl font-bold'>Outliers</h3>
                </div>
                <div>
                <div className='justify h-24 w-full col-span-1 col-start-4 mt-6 rounded-lg border-2 border-gray-800 bg-gray-800'>
                    <h3 className='text-3xl font-bold'>HR%</h3>
                </div>
                <div className='justify h-48 w-full col-span-1 mt-8 col-start-4 rounded-lg border-2 border-gray-800 bg-gray-800'>
                    <h3 className='text-3xl font-bold'>Checklist</h3>
                </div>
                </div>


                </div>
            </main>
        </div>
    );
}

export default ReconApp;
