import EndgameButton from './components/EndGameButton'; 
import FieldButton from './components/LeaveButton';
import LinkButton from '../../components/LinkButton';
import {
    ClimbPosition,
    MatchData,
    MatchSchedule,
    RobotPosition,
    // ScouterPosition,
} from 'requests';
import { SetStateAction, useEffect, useState } from 'react';
import { MaterialSymbol } from 'react-material-symbols';
import 'react-material-symbols/rounded';
import SignIn from '../../components/SignIn';
import Dialog from '../../components/Dialog';
import NumberInput from '../../components/NumberInput';
import CheckBoxMatch from './components/CheckBoxButton';
import { useStatus } from '../../lib/useStatus';
import TeamDropdown from '../../components/TeamDropdown';
import { useQueue } from '../../lib/useQueue';
import scheduleFile from '../../assets/matchSchedule.json';
import { usePreventUnload } from '../../lib/usePreventUnload';
import ToggleButton from '../../components/LightVDarkMode';
import CoralSectionButton from './components/CoralSectionButton';

const schedule = scheduleFile as MatchSchedule;

interface MatchScores {
    autoL1: number;
    autoL2: number;
    autoL3: number;
    autoL4: number;
    autoAlgaenetRobot: number;
    autoProcessor: number;
    autoRemove: number;
    teleRemove: number;
    teleL1: number;
    teleL2: number;
    teleL3: number;
    teleL4: number;
    teleAlgaenetRobot: number;
    teleProcessor: number;
    teleRemoved: number;
}
const defaultScores: MatchScores = {
    autoL1: 0,
    autoL2: 0,
    autoL3: 0,
    autoL4: 0,
    autoAlgaenetRobot: 0,
    autoProcessor: 0,
    autoRemove: 0,
    teleRemove: 0,
    teleL1: 0,
    teleL2: 0,
    teleL3: 0,
    teleL4: 0,
    teleAlgaenetRobot: 0,
    teleProcessor: 0,
    teleRemoved: 0
};

function MatchApp() {
    usePreventUnload();
    const [sendQueue, sendAll, queue, sending] = useQueue();
    const [teamNumber, setTeamNumber] = useState<number>();
    const [matchNumber, setMatchNumber] = useState<number>();
    const [count, setCount] = useState<MatchScores>(defaultScores);
    const [leave, setLeave] = useState(false); //false=Not Left, true=Left
    const [start1, setStart1] = useState(false);
    const [start2, setStart2] = useState(false);
    const [start3, setStart3] = useState(false);
    const [source1, setSource1] = useState(false);
    const [source2, setSource2] = useState(false);
    const [ground1, setGround1] = useState(false);
    const [ground2, setGround2] = useState(false);
    const [ground3, setGround3] = useState(false);
    const [deposit1, setDeposit1] = useState(false);
    const [deposit2, setDeposit2] = useState(false);
    const [deposit3, setDeposit3] = useState(false);
    const [deposit4, setDeposit4] = useState(false);
    const [deposit5, setDeposit5] = useState(false);
    const [deposit6, setDeposit6] = useState(false);
    const [countHistory, setCountHistory] = useState<MatchScores[]>([]);
    const [climbPosition, setClimbPosition] = useState<ClimbPosition>('none');
    const [showCheck, setShowCheck] = useState(false);
    const [scouterName, setScouterName] = useState('');
    const [robotPosition, setRobotPosition] = useState<RobotPosition>();
    const [toggleState, setToggleState] = useState(false);
    // const [scouterPosition, setScouterPosition] = useState<ScouterPosition>();

    const blueAlliance = (
        ['blue_1', 'blue_2', 'blue_3'] as (string | undefined)[]
    ).includes(robotPosition);

    const handleAbsentRobot = async () => {
        if (robotPosition == undefined || matchNumber == undefined) {
            alert('Check if your signed in, and you have the match number');
            return;
        }
    

        const data: MatchData = {
            metadata: {
                scouterName,
                robotPosition,
                matchNumber,
                robotTeam: undefined,
            },
            leftStartingZone: leave,
            startingZone: {
                start1: start1,
                start2: start2,
                start3: start3,
            },
            pickupLocation: {
                source1: source1,
                source2: source2,
                ground1: ground1,
                ground2: ground2,
                ground3: ground3
            },
            placement: {
                deposit1: deposit1,
                deposit2: deposit2,
                deposit3: deposit3,
                deposit4: deposit4,
                deposit5: deposit5,
                deposit6: deposit6,
            },
            autoCoral: {
                L1: count.autoL1,
                L2: count.autoL2,
                L3: count.autoL3,
                L4: count.autoL4,
            },
            autoAlgae: {
                netRobot: count.autoAlgaenetRobot,
                processor: count.autoProcessor,
                remove: count.autoRemove
            },
            teleCoral: {
                L1: count.teleL1,
                L2: count.teleL2,
                L3: count.teleL3,
                L4: count.teleL4
            },
            teleAlgae: {
                netRobot: count.teleAlgaenetRobot,
                processor: count.teleProcessor,
                remove: count.teleRemove
            },
            climb: climbPosition,
        };

        sendQueue('/data/match', data);
        setCount(defaultScores);
        setClimbPosition('none');
        setLeave(false);
        setMatchNumber(matchNumber + 1);
        setCountHistory([]);

        setShowCheck(true);

        setTimeout(() => {
            setShowCheck(false);
        }, 3000);
    };

    const handleSubmit = async () => {
        if (
            robotPosition == undefined ||
            matchNumber == undefined ||
            teamNumber == undefined
        ) {
            alert('data is missing! :(');
            return;
        }

        const data: MatchData = {
            metadata: {
                scouterName,
                robotPosition,
                matchNumber,
                robotTeam: teamNumber,
            },
            leftStartingZone: leave,
            startingZone: {
                start1: start1,
                start2: start2,
                start3: start3,
            },
            pickupLocation: {
                source1: source1,
                source2: source2,
                ground1: ground1,
                ground2: ground2,
                ground3: ground3
            },
            placement: {
                deposit1: deposit1,
                deposit2: deposit2,
                deposit3: deposit3,
                deposit4: deposit4,
                deposit5: deposit5,
                deposit6: deposit6,
            },
            autoCoral: {
                L1: count.autoL1,
                L2: count.autoL2,
                L3: count.autoL3,
                L4: count.autoL4
            },
            autoAlgae: {
                netRobot: count.autoAlgaenetRobot,
                processor: count.autoProcessor,
                remove: count.autoRemove
            },
            teleCoral: {
               L1: count.teleL1,
               L2: count.teleL2,
               L3: count.teleL3,
               L4: count.teleL4
            },
            teleAlgae: {
                netRobot: count.teleAlgaenetRobot,
                processor: count.teleProcessor,
                remove: count.teleRemove
            },
            climb: climbPosition,
        };
        
        sendQueue('/data/match', data);
        setCount(defaultScores);
        setClimbPosition('none');
        setLeave(false);
        setStart1(false);
        setStart2(false);
        setStart3(false);
        setDeposit1(false);
        setDeposit2(false);
        setDeposit3(false);
        setDeposit4(false);
        setDeposit5(false);
        setDeposit6(false);
        setSource1(false);
        setSource2(false);
        setGround1(false);
        setGround2(false);
        setGround3(false);
        setMatchNumber(matchNumber + 1);
        setCountHistory([]);

        setShowCheck(true);

        setTimeout(() => {
            setShowCheck(false);
        }, 3000);
    };

    const showConfirmationDialog = () => {
        if (window.confirm('Are you sure you want to mark as absent?')) {
            // User confirmed, call the action
            handleAbsentRobot();
            // Optionally, you can also scroll to the top
            scrollTo(0, 0);
        }
    };

    const undoCount = () => {
        if (countHistory.length > 0) {
            setCountHistory(prevHistory => prevHistory.slice(0, -1));
            setCount(countHistory.at(-1)!);
        }
    };
    const handleSetCount = (newCount: SetStateAction<MatchScores>) => {
        setCountHistory([...countHistory, count]);
        setCount(newCount);
    };

    useEffect(() => {
        setTeamNumber(
            schedule && robotPosition && matchNumber
                ? schedule[matchNumber]?.[robotPosition]
                : undefined
        );
    }, [matchNumber, robotPosition]);

    useStatus(robotPosition, matchNumber, scouterName);

    function buttonToggle() {
        if (toggleState == false) {
            setToggleState(true);
        } else {
            setToggleState(false);
        }
    }


    return (
       <div className= {`${ toggleState ? 'bg-[#171c26]' : 'bg-white'}`}> 
        <main className='mx-auto flex w-min grid-flow-row flex-col content-center items-center justify-center '>
            {showCheck && (
                <MaterialSymbol
                    icon='check'
                    size={150}
                    fill
                    grade={200}
                    color="#48c55c"
                    className='absolute right-10 top-0 ml-10'
                />
            )}
            <h1 className='my-8 mt-10 text-center font-semibold text-[#48c55c] text-3xl'>Match Scouting App</h1>

            <div className='fixed left-4 top-4 z-30 flex flex-row gap-3 rounded-md bg-slate-200 p-1'>
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

                <Dialog
                    open
                    trigger={open => (
                        <button onClick={open}>
                            <MaterialSymbol
                                icon='account_circle'
                                size={60}
                                fill
                                grade={200}
                                className={` ${scouterName && robotPosition ? 'text-green-400' : 'text-gray-400'} snap-none`}
                            />
                        </button>
                    )}>
                    {close => (
                        <SignIn
                            scouterName={scouterName}
                            onChangeScouterName={setScouterName}
                            robotPosition={robotPosition}
                            onChangeRobotPosition={setRobotPosition}
                            // scouterPosition={scouterPosition}
                            // onChangeScouterPosition={setScouterPosition}
                            onSubmit={close}
                        />
                    )}
                </Dialog>
                <button
                    onClick={undoCount}
                    className='z-10 aspect-square snap-none rounded bg-[#f07800]  font-bold text-black '>
                    <MaterialSymbol
                        icon='undo'
                        size={60}
                        fill
                        grade={200}
                        color='black'
                        className='snap-none'
                    />
</button>

                <div className={`fixed right-4 top-4 z-20 flex flex-row gap-3 rounded-md p-1`}>
                    <ToggleButton
                    className='' 
                    buttonClassName=''
                    onClick={buttonToggle}>
                    <MaterialSymbol
                        icon={`${toggleState ? 'dark_mode' : 'light_mode'}`}
                        size={60}
                        fill
                        grade={200}
                        color='#48c55c'
                        className='snap-none'
                    />
                    </ToggleButton>
                </div>

            </div>

            <p className={`mb-2 mt-2 text-2xl ${ toggleState ? 'text-white' : 'text-[#171c26]'}`}>Match Number</p>
            <NumberInput
                className='border border-black'
                onChange={setMatchNumber}
                value={matchNumber}
            />
            <p className={`mb-2 mt-8 text-2xl ${toggleState ? 'text-white' : 'text-[#171c26]'}`}>Team Number</p>
            <TeamDropdown onChange={setTeamNumber} value={teamNumber} />

            <div>
                <button
                    onClick={showConfirmationDialog}
                    style={{ fontSize: '20px' }}
                    className='mb-2 mt-14 rounded-md bg-green-500 px-2 py-1 text-center'>
                    Robot Absent
                </button>
            </div>

            <div>
                <h2 className='mb-5 mt-12 text-center text-5xl font-semibold text-green-600'>
                    Autonomous
                </h2>
                
                <img src={`${blueAlliance ? 'bluesidematch.png': 'redsidematch.png'}`} width={500} height={600} className='justify-self-center my-7'></img>
                {   <CheckBoxMatch
                    checked={ground1}
                    onChange={setGround1}
                    className={`${blueAlliance ? 'top-[660px] left-[285px]' :'top-[670px] left-[440px] ' } absolute z-20 h-10 w-10 overflow-hidden rounded-full text-left`}>
                    </CheckBoxMatch>
                    // ground 1
                    }
                    <CheckBoxMatch
                    checked={ground2}
                    onChange={setGround2}
                    className={`${blueAlliance ? 'top-[740px] left-[285px]' :'top-[760px] left-[440px]' } absolute z-20 h-10 w-10 overflow-hidden rounded-full text-left`}>
                    </CheckBoxMatch>
                    {/* ground 2 */}
                    <CheckBoxMatch
                    checked={ground3}
                    onChange={setGround3}
                    className={`${blueAlliance ? 'top-[820px] left-[285px]' :'top-[840px] left-[440px]' } absolute z-20 h-10 w-10 overflow-hidden rounded-full text-left`}>
                    </CheckBoxMatch>
                    {/* ground 3 */}
                    <CheckBoxMatch
                    checked={source1}
                    onChange={setSource1}
                    className={`${blueAlliance? 'top-[570px] left-[250px]' :'top-[585px] left-[485px] ' } absolute z-20 h-10 w-10 overflow-hidden rounded-full text-left`}>
                    </CheckBoxMatch>
                    {/* source 1 */}
                    <CheckBoxMatch
                    checked={source2}
                    onChange={setSource2}
                    className={`${blueAlliance? 'top-[910px] left-[250px]' :'top-[930px] left-[485px] ' } absolute z-20 h-10 w-10 overflow-hidden rounded-full text-left`}>
                    </CheckBoxMatch>
                    {/* source 2 */}
                    <CheckBoxMatch
                    checked={start1}
                    onChange={setStart1}
                    className={`${blueAlliance? 'top-[645px] left-[565px] ' :'top-[660px] left-[160px]' } absolute z-20 h-10 w-10 overflow-hidden rounded-full text-left`}>
                    </CheckBoxMatch>
                    {/* starting location 1 */}
                    <CheckBoxMatch
                    checked={start2}
                    onChange={setStart2}
                    className={`${blueAlliance? 'top-[740px] left-[565px]' :'top-[760px] left-[160px]' } absolute z-20 h-10 w-10 overflow-hidden rounded-full text-left`}>
                    </CheckBoxMatch>
                    {/* starting location 2 */}
                    <CheckBoxMatch
                    checked={start3}
                    onChange={setStart3}
                    className={`${blueAlliance? 'top-[835px] left-[565px]' :'top-[858px] left-[160px]' } absolute z-20 h-10 w-10 overflow-hidden rounded-full text-left`}>
                    </CheckBoxMatch>
                    {/* starting location 3 */}
                    
                    
                    
                    <CoralSectionButton
                        onChange={setDeposit1}
                        value={deposit1} 
                        selectClassName={`${blueAlliance? 'bg-green-300 absolute left-[27.45em] top-[44.3em]':'bg-green-300 absolute left-[18.5em] top-[45.3em]'} h-[1em] w-[4.5em] rotate-[6.83rad]`}
                        unselectClassName={`${blueAlliance? 'bg-red-300 absolute left-[27.45em] top-[44.3em]':'bg-red-300 absolute left-[18.5em] top-[45.3em]'} h-[1em] w-[4.5em] rotate-[6.83rad]`}>
                    </CoralSectionButton>
                    <CoralSectionButton
                        onChange={setDeposit2}
                        value={deposit2} 
                        selectClassName={`${blueAlliance? 'bg-green-300 absolute left-[29.4em] top-[47.1em]':'bg-green-300 absolute left-[20.2em] top-[48.4em]'} h-[1em] w-[4em] rotate-90`}
                        unselectClassName={`${blueAlliance? 'bg-red-300 absolute left-[29.4em] top-[47.1em]':'bg-red-300 absolute left-[20.2em] top-[48.4em]'} h-[1em] w-[4em] rotate-90`}>
                    </CoralSectionButton>
                    <CoralSectionButton
                        onChange={setDeposit3}
                        value={deposit3} 
                        selectClassName={`${blueAlliance? 'bg-green-300 absolute left-[27.6em] top-[49.9em]':'bg-green-300 absolute left-[18.5em] top-[51.1em]'} h-[1em] w-[4em] rotate-[2.6rad]`}
                        unselectClassName={`${blueAlliance? 'bg-red-300 absolute left-[27.6em] top-[49.9em]':'bg-red-300 absolute left-[18.5em] top-[51.1em]'} h-[1em] w-[4em] rotate-[2.6rad]`}>
                    </CoralSectionButton>
                    <CoralSectionButton 
                        onChange={setDeposit4}
                        value={deposit4}
                        selectClassName={`${blueAlliance? 'bg-green-300 absolute left-[24.35em] top-[49.9em]':'bg-green-300 absolute left-[15.2em] top-[51em]'} h-[1em] w-[4em] rotate-[6.83rad]`}
                        unselectClassName={`${blueAlliance? 'bg-red-300 absolute left-[24.35em] top-[49.9em]':'bg-red-300 absolute left-[15.2em] top-[51em]'} h-[1em] w-[4em] rotate-[6.83rad]`}>
                    </CoralSectionButton>
                    <CoralSectionButton 
                        onChange={setDeposit5}
                        value={deposit5}
                        selectClassName={`${blueAlliance? 'bg-green-300 absolute left-[22.85em] top-[47.3em]':'bg-green-300 absolute left-[13.75em] top-[48.05em]'} h-[1em] w-[4em] rotate-90`}
                        unselectClassName={`${blueAlliance? 'bg-red-300 absolute left-[22.85em] top-[47.3em]':'bg-red-300 absolute left-[13.75em] top-[48.05em]'} h-[1em] w-[4em] rotate-90`}>
                    </CoralSectionButton>
                    <CoralSectionButton
                        onChange={setDeposit6}
                        value={deposit6} 
                        selectClassName={`${blueAlliance? 'bg-green-300 absolute left-[24.3em] top-[44.4em]':'bg-green-300 absolute left-[15.4em] top-[45.3em]'} h-[1em] w-[4em] rotate-[2.6rad]`}
                        unselectClassName={`${blueAlliance? 'bg-red-300 absolute left-[24.3em] top-[44.4em]':'bg-red-300 absolute left-[15.4em] top-[45.3em]'} h-[1em] w-[4em] rotate-[2.6rad]`}>
                    </CoralSectionButton>
                    
                <p
                    className={`text-center m-5 ${toggleState ? 'text-white' : 'text-[#171c26]'}`}>
                    Please select starting position, collection location, and scored location in autos.
                </p>

                { <FieldButton
                    setCount={handleSetCount}
                    setLeave={setLeave}
                    count={count}
                    teleOp={false}
                    leave={leave}
                    styleMode={toggleState}
                /> }
                <h2 className='my-6 mt-12 text-center text-5xl font-semibold text-green-600'>
                    Tele-Op
                </h2>
                { <FieldButton
                    setCount={handleSetCount}
                    count={count}
                    teleOp={true}
                    styleMode={toggleState}
                /> }
                <h2 className='my-6 mt-12 text-center text-5xl font-semibold text-green-600'>
                    Endgame
                </h2>
                <EndgameButton
                    climbPosition={climbPosition}
                    setClimb={setClimbPosition}
                    count={count}
                    setCount={setCount}
                />
                <div className='mb-5 mt-20 flex flex-col justify-center'>
                    <button
                        onClick={() => {
                            handleSubmit();
                            scrollTo(0, 0);
                        }}
                        style={{ fontSize: '30px' }}
                        className='rounded-md bg-green-500 px-2 py-1 text-center'>
                        Submit
                    </button>
                </div>
            </div>

            <div>
                <div className={`${toggleState ? 'text-white' : 'text-[#171c26]'} justify-center text-center`}>
                Queue: {queue.length}</div>
                <button
                    onClick={sendAll}
                    className='rounded-md bg-amber-500 px-2 py-1 text-center mb-5'>
                    {sending ? 'Sending...' : 'Resend All'}
                </button>
            </div>
        </main>
        </div> 
    );
}

export type { MatchScores, ClimbPosition };

export default MatchApp;