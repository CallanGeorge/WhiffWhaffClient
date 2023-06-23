export enum RequestResponse {
  PENDING,
  AECCEPTED,
  REJECTED,
}

export interface match {
  id: string;
  player1: string;
  player2: string;
  player1Voted: boolean;
  player2Voted: boolean;
  player1Vote: string;
  player2Vote: string;
  accepted: RequestResponse;
  winner: string;
}
