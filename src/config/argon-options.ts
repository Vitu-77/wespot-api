import { type Options as ArgonOptions } from '@node-rs/argon2';

export const ARGON_OPTIONS: ArgonOptions = {
  algorithm: 2,
  memoryCost: 1024 * 8,
  timeCost: 3,
};
