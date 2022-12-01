import { chunk, minBy, sum, sumBy } from "lodash";
import { getTextFileLines } from "../utils/getInput";

type Packet = {
  v: number;
  t: number;
  l?: number;
  i?: number;
  value: number;
  subpackets?: Packet[];
};

const hex2bin = (hex: string) => parseInt(hex, 16).toString(2).padStart(4, "0");

const bin2dec = (bin: string | string[]): number => {
  if (typeof bin !== "string") {
    bin = bin.join("");
  }
  return parseInt(bin, 2);
};

class Transmission {
  private bits: string[];

  constructor(bits: string[]) {
    this.bits = bits;
  }

  peak(length: number): string[] {
    return this.bits.slice(0, length);
  }

  peakAll(): string[] {
    return this.bits;
  }

  read(length: number): string[] {
    const bits = this.bits.slice(0, length);
    this.bits = this.bits.slice(length);
    return bits;
  }

  getPackets(limit = 0): Packet[] {
    const packets: Packet[] = [];
    let i = 0;
    while (this.peakAll().length && bin2dec(this.peakAll().join("")) !== 0) {
      packets.push(this.readPacket());
      i++;
      if (limit && limit === i) {
        break;
      }
    }

    return packets;
  }

  readPacket(): Packet {
    const v = bin2dec(this.read(3)); // Operator packet version
    const t = bin2dec(this.read(3)); // Packet type ID

    const packet: Packet = {
      v,
      t,
      value: 0,
    };

    const subpackets: Packet[] = [];

    if (packet.t !== 4) {
      packet.i = bin2dec(this.read(1)); // Length type ID

      if (packet.i === 0) {
        packet.l = bin2dec(this.read(15)); // Sub packet length
        subpackets.push(...new Transmission(this.read(packet.l)).getPackets());
      } else {
        packet.l = bin2dec(this.read(11)); // Sub packet length
        const subPackageTransmission = new Transmission(this.peakAll());

        subpackets.push(...subPackageTransmission.getPackets(packet.l));
        this.bits = subPackageTransmission.peakAll();
      }
    }

    packet.subpackets = subpackets;

    switch (packet.t) {
      case 0:
        packet.value = subpackets.reduce((acc, cur) => acc + cur.value, 0);
        break;
      case 1:
        packet.value = subpackets.reduce((acc, cur) => acc * cur.value, 1);
        break;
      case 2:
        packet.value = subpackets.reduce(
          (acc, cur) => (acc ? Math.min(acc, cur.value) : cur.value),
          0
        );
        break;
      case 3:
        packet.value = subpackets.reduce(
          (acc, cur) => Math.max(acc, cur.value),
          0
        );
        break;
      case 4:
        let valueBits = "";
        while (true) {
          const block = this.read(5);
          valueBits += block.slice(1).join("");

          if (block[0] === "0") {
            break;
          }
        }

        packet.value = bin2dec(valueBits);
        break;
      case 5:
        packet.value = subpackets[0].value > subpackets[1].value ? 1 : 0;
        break;
      case 6:
        packet.value = subpackets[0].value < subpackets[1].value ? 1 : 0;
        break;
      case 7:
        packet.value = subpackets[0].value === subpackets[1].value ? 1 : 0;
        break;
    }

    return packet;
  }
}

const getVersionSum = (packet: Packet): number => {
  if (packet.subpackets) {
    return packet.subpackets.reduce(
      (acc, cur) => acc + getVersionSum(cur),
      packet.v
    );
  } else {
    return packet.v;
  }
};

export const part1 = (input: string): number => {
  const bits = input
    .split("")
    .map((char) => hex2bin(char))
    .map((bin) => bin.split(""))
    .flat();

  const transmission = new Transmission(bits);

  const packet = transmission.readPacket();

  return getVersionSum(packet);
};

export const part2 = (input: string): number => {
  const bits = input
    .split("")
    .map((char) => hex2bin(char))
    .map((bin) => bin.split(""))
    .flat();

  const transmission = new Transmission(bits);

  const packets = transmission.getPackets();

  return packets[0].value;
};
