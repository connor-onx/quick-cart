// app/types/facefilter.d.ts

export interface FaceExpression {
  mouthOpen: number;
  mouthSmile: number;
  eyebrowFrown: number;
  eyebrowRaised: number;
}

export interface DetectState {
  expressions: [number, number, number, number];
  [key: string]: unknown;
}
