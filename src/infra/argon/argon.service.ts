import { Injectable } from '@nestjs/common';
import argon, { type Options as ArgonOptions } from '@node-rs/argon2';

import { env } from 'src/env';

@Injectable()
export class ArgonService {
  private PEPPER = env.HASH_PEPPER;
  private ARGON_OPTIONS: ArgonOptions = {
    algorithm: 2,
    memoryCost: 1024 * 8,
    timeCost: 3,
  };

  async compareHash(
    hash: string,
    stringToCompare: string,
    options?: Partial<ArgonOptions>,
  ) {
    return argon.verify(hash, `${stringToCompare}::${this.PEPPER}`, {
      ...this.ARGON_OPTIONS,
      ...(options ?? {}),
    });
  }

  async hashString(string: string, options?: Partial<ArgonOptions>) {
    return argon.hash(`${string}::${this.PEPPER}`, {
      ...this.ARGON_OPTIONS,
      ...(options ?? {}),
    });
  }
}
