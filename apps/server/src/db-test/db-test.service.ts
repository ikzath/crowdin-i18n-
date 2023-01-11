import { Injectable } from '@nestjs/common';
import {
  createDB,
  createTable,
  many,
  insertMany,
  one,
  updateWhere,
} from 'blinkdb';

interface Persona {
  //   id: string;
  passportId: string;
  firstName: string;
  lastName: string;
  age: number;
}

const db = createDB();
const personasTable = createTable<Persona>(
  db,
  'personas',
)({
  primary: 'passportId', // define primary key
});

const personas: Persona[] = [];
const totalPersonas = 10000;
for (let i = 0; i < totalPersonas; i++) {
  if (i % 1000 === 0) {
    personas.push({
      // id: uuid(),
      passportId: 'foobar' + i,
      firstName: 'Ben',
      lastName: 'Gunn',
      age: 22,
    });
  } else {
    personas.push({
      // id: uuid(),
      passportId: 'foobar' + i,
      firstName: 'allen',
      lastName: 'iverson',
      age: 44,
    });
  }
}

@Injectable()
export class DbTestService {
  async populateTable(): Promise<void> {
    await insertMany(personasTable, personas);
    await many(personasTable);
    // return populatedWith;
    // console.log('table populated', populatedWith);
  }

  async findOneById(): Promise<Persona> {
    const randomIndex = Math.floor(Math.random() * totalPersonas);
    const queryStart = Date.now();
    const queryRandomPersona = await one(personasTable, {
      where: {
        passportId: 'foobar' + randomIndex,
      },
    });
    const queryEnd = Date.now();
    return queryRandomPersona;
    console.log('find one result: ', queryRandomPersona);
    console.log('Query took: ' + (queryEnd - queryStart) + 'ms');
  }

  async findBenGunn(): Promise<Persona[]> {
    const queryStart = Date.now();
    const queryBenGunn = await many(personasTable, {
      where: {
        firstName: 'Ben',
      },
    });
    const queryEnd = Date.now();
    console.log('find many result: ', queryBenGunn);
    console.log('Query took: ' + (queryEnd - queryStart) + 'ms');
    return queryBenGunn;
  }

  async updateBenSurname(): Promise<void> {
    const queryStart = Date.now();

    const updatedData: Array<Persona> = [];
    await updateWhere(
      personasTable,
      { where: { firstName: 'Ben' } },
      (user) => {
        const updatedUser = { ...user, lastName: 'Smith' };
        updatedData.push(updatedUser);
        return updatedUser;
      },
    );
    const queryEnd = Date.now();
    console.log('update many result: ', updatedData);
    console.log('Query took: ' + (queryEnd - queryStart) + 'ms');
  }
}
