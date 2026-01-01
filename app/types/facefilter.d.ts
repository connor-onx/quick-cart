interface FaceExpression {
  mouthOpen: number;
  mouthSmile: number;
  eyebrowFrown: number;
  eyebrowRaised: number;
}

interface DetectState {
  expressions: [number, number, number, number];
  [key: string]: unknown;
}
