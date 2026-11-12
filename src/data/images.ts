const u = (id: string, width = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

export const img = {
  hero: u("1600596542815-ffad4c1539a9", 2400),
  heroSecondary: u("1600585154340-be6161a56a0c", 2000),
  delhi: u("1587474260584-136574528ed5", 1800),
  noida: u("1515263487990-61b07816b324", 1800),
  greaterNoida: u("1479839672679-a46483c0e7c8", 1800),
  plot: u("1500382017468-9049fed747ef", 1800),
  construction: u("1541888946425-d81bb19240f5", 1800),
  office: u("1486406146926-c627a92ad1ab", 1800),
  officeInterior: u("1497366754035-f200968a6e72", 1800),
};

export const gallery = {
  modernVilla: [
    u("1600596542815-ffad4c1539a9"),
    u("1600566753086-00f18fb6b3ea"),
    u("1600607687920-4e2a09cf159d"),
    u("1512917774080-9991f1c4c750"),
  ],
  cityApartment: [
    u("1460317442991-0ec209397118"),
    u("1600585154340-be6161a56a0c"),
    u("1600210492486-724fe5c67fb0"),
    u("1600573472592-401b489a3cdc"),
  ],
  luxuryHome: [
    u("1600607687939-ce8a6c25118c"),
    u("1600566753190-17f0baa2a6c3"),
    u("1583608205776-bfd35f0d9f83"),
    u("1564013799919-ab600027ffc6"),
  ],
  builderFloor: [
    u("1568605114967-8130f3a36994"),
    u("1600494603989-9650cf6ddd3d"),
    u("1600566752355-35792bedcfea"),
    u("1570129477492-45c003edd2be"),
  ],
  familyHome: [
    u("1600585152220-90363fe7e115"),
    u("1600607688969-a5bfcd646154"),
    u("1600210491892-03d54c0aaf87"),
    u("1600585154363-67eb9e2e2099"),
  ],
  gardenVilla: [
    u("1600585152915-d208bec867a1"),
    u("1600607688066-890987f18a86"),
    u("1600573472550-8090b5e0745e"),
    u("1600585153490-76fb20a32601"),
  ],
  penthouse: [
    u("1600585154526-990dced4db0d"),
    u("1600210491369-e753d80a41f3"),
    u("1600607688960-e095ff83135c"),
    u("1600596542815-ffad4c1539a9"),
  ],
  commercial: [
    u("1486406146926-c627a92ad1ab"),
    u("1497366754035-f200968a6e72"),
    u("1497366811353-6870744d04b2"),
    u("1556761175-b413da4baf72"),
  ],
  plot: [
    u("1500382017468-9049fed747ef"),
    u("1472214103451-9374bd1c798e"),
    u("1541888946425-d81bb19240f5"),
    u("1465447142348-e9952c393450"),
  ],
};

export const portraits = {
  aditi: u("1494790108377-be9c29b29330", 900),
  rohan: u("1500648767791-00dcc994a43e", 900),
  sanya: u("1573496359142-b8d87734a5a2", 900),
  arjun: u("1507003211169-0a1dd7228f2d", 900),
  kabir: u("1560250097-0b93528c311a", 900),
  meera: u("1580489944761-15a19d654956", 900),
  vikram: u("1519085360753-af0119f7cbe7", 900),
  naina: u("1573496359142-b8d87734a5a2", 900),
};

export const blogImages = {
  comparison: img.delhi,
  stampDuty: img.office,
  jewar: img.construction,
  noidaSectors: img.noida,
  dda: gallery.builderFloor[0],
  noidaExtension: img.greaterNoida,
};
