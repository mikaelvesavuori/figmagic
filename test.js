const x = `element=h1
description=asdf`;

function test() {
  const a = x.match(/element=(.*)/);
  const match = a ? a[0] : null;
  if (match) console.log(x.replace(match, '').replace(/\n/, 'asdf'));
}

test();
