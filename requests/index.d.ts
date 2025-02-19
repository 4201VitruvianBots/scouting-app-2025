export type ClimbPosition = 'shallow'| 'deep' | 'park' | 'none' | 'failed';
export type teamRoles = 'scoring' | 'defense' | 'support' | 'all-round';
export type drivebase = 'tank' | 'swerve' | 'MECANUM' | 'other';

export type RobotPosition =
    | 'red_1'
    | 'red_2'
    | 'red_3'
    | 'blue_1'
    | 'blue_2'
    | 'blue_3';
export type Foul =
    | 'insideRobot'
    | 'protectedZone'
    | 'pinning'
    | 'multiplePieces'
    | 'cageFoul'
    | 'other';
export type Break = 'mechanismDmg' | 'batteryFall' | 'commsFail';
export type DefenseRank = 'fullDef' | 'someDef' | 'noDef';
export type CommentValues =
    | 'great_driving'
    | 'good_driving'
    | 'source_only'
    | 'clogging'
    | 'effective_defense'
    | 'okay_defense'
    | 'ineffective_defense'
    | 'sturdy_build'
    | 'weak_build'
    | 'avoids_under_stage';

// export type leaderboardValues = 'Vanessa' | 'Crisanto' | 'Christian' | 'Nathan' | 'Ashreeya' | 'Tica';

// find me



export type Net = boolean;

interface capabilities {
    coral: boolean;
    algae: boolean;
    climbShallow: boolean;
    climbDeep: boolean;
}


interface preference {
    coralPrefer: boolean;
    algaePrefer: boolean;
    climbSPrefer: boolean;
    climbDPrefer: boolean;
}

export type SuperPosition = 'red_ss' | 'blue_ss';
// export type ScoringLocation = 'A' | 'B';

export type ScouterPosition = 'red_right' | 'blue_right';

export interface MatchDataAggregations {
    _id: { teamNumber: number };
    averageTeleCoral: number;
    averageTeleAlgaeProcessor: number;
    averageTeleAlgaeRobotNet: number;
    averageAutoCoral: number;
    averageAutoAlgaeProcessor: number;
    averageAutoAlgaeRobotNet: number;
    maxTeleCoral: number;
    maxTeleAlgaeProcessor: number;
    maxTeleAlgaeRobotNet: number;
    maxAutoCoral: number;
    maxAutoAlgaeProcessor: number;
    maxAutoAlgaeRobotNet: number;
    maxCoral: number;
    maxAlgaeProcessor: number;
    maxAlgaeRobotNet: number;
    avgClimbRate: number;
}

// export interface ScouterDataAggregations {
//     scouterName: string
//     accuracy: number;
// }
// find me

export interface SuperDataAggregations {
    _id: { teamNumber: number };
    avgFouls: number;
    maxFouls: number;
}

export interface MetaData {
    scouterName: string;
    matchNumber: number;
    robotTeam?: number;
    robotPosition: RobotPosition;
}

interface coral {
    L1: number;
    L2: number;
    L3: number;
    L4: number;
}

interface algae {
    netRobot: number;
    processor: number;
}

interface StartingZone {
    left: boolean;
    middle: boolean;
    right: boolean;
}

interface pickup {
    leftSource: boolean;
    rightSource: boolean;
    ground1: boolean;
    ground2: boolean;
    round3: boolean
}

interface placeLocation {
    deposit1: boolean;
    deposit2: boolean;
    deposit3: boolean;
    deposit4: boolean;
    deposit5: boolean;
    deposit6: boolean;
}
// - `POST` `/data/match`

export interface MatchData {
    metadata: MetaData;
    // No competition info
    leftStartingZone: boolean;
    startingZone: StartingZone;
    pickupLocation: pickup;
    placement: placeLocation;
    autoCoral: coral;
    autoAlgae: algae;
    teleCoral: coral;
    teleAlgae: algae;
    climb: ClimbPosition;
    // disabledSeconds: number;
}

// - `POST` `/data/super`

export interface SuperData {
    metadata: MetaData;
    fouls: Record<Foul, number>;
    break: Record<Break, number>;
    defense: DefenseRank;
    defended: boolean;
    netHuman: number;
    humanShooter?: { Net: Net };
    comments: CommentValues[];
}

// - `POST` `/data/pits`
// `<form>` files?

export interface ScouterData {
    scouterName: string;
    accuracy: number;
    
}
// find me

export interface PitFile {
    scouterName: string;
    teamNumber: number;
    capabilities: capabilities;
    preference: preference;
    autoCapability: string[];
    teamRole: teamRoles;
    pitBatteryCount: number;
    drivebase: drivebase;
    comments: string;
    photo: string;
}

export type PitResult = Partial<Record<number, Omit<PitFile, 'photo'>>>;

// - `WebSocket` `/status/report`
// client -> server

export interface StatusReport {
    robotPosition: RobotPosition | SuperPosition | undefined;
    matchNumber: number | undefined;
    scouterName: string;
    battery: number | undefined;
}

// - `WebSocket` `/status/recieve`
// server -> client

export interface StatusRecieve {
    scouters: StatusReport[];
    matches: MatchStatus;
}

export type MatchStatus = Record<
    number,
    Record<RobotPosition, { schedule: number; real: number[] }> &
        Record<SuperPosition, boolean>
>;
// - `GET` `/data/schedule.json`

export type MatchSchedule = Record<number, Record<RobotPosition, number>>;

export interface TeamInfo {
    address: null;
    city: string | null;
    country: string | null;
    gmaps_place_id: null;
    gmaps_url: null;
    home_championship: Record<string, string> | null;
    key: string;
    lat: null;
    lng: null;
    location_name: null;
    motto: null;
    name: string;
    nickname: string;
    postal_code: string;
    rookie_year: number;
    school_name: string;
    state_prov: string;
    team_number: number;
    website: string | null;
}

export type TeamData = Partial<{
    [key: string]: {
        primaryHex: string;
        secondaryHex: string;
        verified: boolean;
        avatar?: string;
        info?: TeamInfo;
    };

    
}>;
