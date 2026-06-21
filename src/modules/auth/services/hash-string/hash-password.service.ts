import { Injectable } from '@nestjs/common';
import argon from '@node-rs/argon2';

import { ARGON_OPTIONS } from 'src/config/argon-options';
import { env } from 'src/env';

@Injectable()
export class HashStringService {
  public PEPPER = env.HASH_PEPPER;

  constructor() {}

  async execute(password: string) {
    return argon.hash(`${password}::${this.PEPPER}`, ARGON_OPTIONS);
  }
}
