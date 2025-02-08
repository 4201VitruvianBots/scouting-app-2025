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

const matchStats: Exclude<keyof MatchDataAggregations, '_id'>[] = [  
    'maxTeleCoral',
    'maxTeleAlgaeProcessor',
    'maxTeleAlgaeRobotNet',
    'maxAutoCoral',
    'maxAutoAlgaeProcessor',
    'maxAutoAlgaeRobotNet',
    'maxCoral',
    'maxAlgaeProcessor',
    'maxAlgaeRobotNet',
    'avgClimbRate'
];
const superStats: Exclude<keyof SuperDataAggregations, '_id'>[] = [
    'avgFouls',
    'maxFouls',
];


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
       <div className='bg-[#171c26] h-screen min-h-fit border-4 border-[#171c26]'> 
        <main className='mx-auto mb-5 flex h-full grid-flow-row flex-col content-center items-center justify-center bg-[#171c26] text-white bg-repeat'>
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
                        <TeamDropdown
                            onChange={setTeamNumber}
                            value={teamNumber}                        />
            <button
                className='mt-5 mb-10 rounded-lg border-2 border-slate-900 text-lg'
                onClick={() => {
                    reloadRetrieveMatch();
                    reloadRetrieveSuper();
                }}>
                Reload Data
            </button>
            <div className='flex w-full h-full'>

            <div className="w-2/5 bg-gray-800 border-2 border-gray-800 rounded-lg p-4 flex justify-end">
            img go here
            </div>
            
            <div className="flex justify-center items-center w-2/5 bg-gray-800 border-2 border-gray-800 rounded-lg p-4 flex justify-end ml-auto">
            <BarChartWIP></BarChartWIP>
            </div>

            </div>

            <div className='w-2/5 bg-gray-800 border-2 border-gray-800 rounded-lg p-4 flex justify items-center justify-start mr-auto m-10 h-80'>
            <h3 className='text-3xl font-bold'>Autos</h3>
            </div>
        </main>
        </div> 
    );
}

export default ReconApp;
