import { Injectable } from '@nestjs/common';
import argon from '@node-rs/argon2';

import { ARGON_OPTIONS } from 'src/config/argon-options';
import { env } from 'src/env';

@Injectable()
export class HashPasswordService {
  public PEPPER = env.PASSWORD_PEPPER;

  constructor() {}

  async execute(password: string) {
    return argon.hash(`${password}::${this.PEPPER}`, ARGON_OPTIONS);
  }
}
