import { Injectable } from '@nestjs/common';
import argon from '@node-rs/argon2';

import { ARGON_OPTIONS } from 'src/config/argon-options';
import { env } from 'src/env';

@Injectable()
export class CompareHashService {
  public PEPPER = env.HASH_PEPPER;

  constructor() {}

  async execute(hash: string, password: string) {
    return argon.verify(hash, `${password}::${this.PEPPER}`, ARGON_OPTIONS);
  }
}
