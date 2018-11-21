import { expect } from 'chai';
// import * as window from 'global/window';

import { deepCopy } from '../src/index';

describe('deep copy', () => {
  it('same primitive', () => {
    expect(deepCopy(null)).to.be.equal(null);
    expect(deepCopy(undefined)).to.be.equal(undefined);
    expect(deepCopy(1)).to.be.equal(1);
    expect(deepCopy('1')).to.be.equal('1');
    expect(deepCopy(true)).to.be.equal(true);
    expect(deepCopy(false)).to.be.equal(false);
    const tag = Symbol();
    expect(deepCopy(tag)).to.be.equal(tag);
  });

  it('same function', () => {
    const fn = () => null;
    expect(deepCopy(fn)).to.be.equal(fn);
  });

  it('same array data, but diff array reference', () => {
    const origin = [null, undefined, 1, 'str', true, false, Symbol()];
    const modify = deepCopy(origin);
    expect(modify).to.be.not.equal(origin);
    for (const index in origin) {
      expect(modify![index]).to.be.equal(origin![index]);
    }
  });

  it('same object data, but diff object reference', () => {
    const origin = { x: null, y: undefined, z: 1, h: 'str', i: true, j: false, k: Symbol() };
    const modify = deepCopy(origin);
    expect(modify).to.be.not.equal(origin);
    for (const key in origin) {
      expect(modify![key]).to.be.equal(origin![key]);
    }
  });

  it('array recurve', () => {
    const origin = [{ x: 1, y: 2}, { m: [1, 2] }];
    const modify = deepCopy(origin);
    expect(modify).to.be.not.equal(origin);
    expect(modify![0]).to.be.not.equal(origin[0]);
    expect(modify![1]).to.be.not.equal(origin[1]);
    expect(modify![1].m).to.be.not.equal(origin[1].m);

    expect(modify![0].x).to.be.equal(origin[0].x);
    expect(modify![0].y).to.be.equal(origin[0].y);
    expect(modify![1].m![0]).to.be.equal(origin[1].m![0]);
    expect(modify![1].m![1]).to.be.equal(origin[1].m![1]);
  });

  it('object recurve', () => {
    const origin = { x: { m: { a: 'str', b: false }, n: [{ a: Symbol() }] }, y: [1, true, 'str']}
    const modify = deepCopy(origin);
    expect(modify).to.be.not.equal(origin);
    expect((modify as any).x).to.be.not.equal(origin.x);
    expect((modify as any)!.y).to.be.not.equal(origin.y);
    expect((modify as any).x.m).to.be.not.equal(origin.x.m);
    expect((modify as any)!.x.n).to.be.not.equal(origin.x.n);
    expect((modify as any)!.x.n[0]).to.be.not.equal(origin.x.n[0]);

    expect((modify as any).x.m.a).to.be.equal(origin.x.m.a);
    expect((modify as any).x.m.b).to.be.equal(origin.x.m.b);
    expect((modify as any).x.n[0].a).to.be.equal(origin.x.n[0].a);
    expect((modify as any).y[0]).to.be.equal(origin.y[0]);
    expect((modify as any).y[1]).to.be.equal(origin.y[1]);
    expect((modify as any).y[2]).to.be.equal(origin.y[2]);
  });
});