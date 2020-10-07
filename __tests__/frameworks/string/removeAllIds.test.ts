import { removeAllIds } from '../../../bin/frameworks/string/removeAllIds';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      removeAllIds();
    }).toThrow();
  });
});

describe('Success cases', () => {
  const TEST_1 = '.:disabled__#5199 {';

  const TEST_2 = `
text-align: center;
text-transform: uppercase;

&.Normal__#8636 {
  background-color: \${colors.blue1};
  &:disabled__#8636 {
    background-color: \${colors.gray1};
  }
}

&.Warning__#9209 {
  background-color: \${colors.orange};
  &:disabled__#9209 {
    background-color: \${colors.gray1};
  }
  &:hover__#9209 {
    background-color: \${colors.yellow};
  }
}

&.Error__#6776 {
  background-color: \${colors.red};
  &:hover__#6776 {
    background-color: \${colors.orange};
  }
}
`;

  const EXPECTED = `
text-align: center;
text-transform: uppercase;

&.Normal {
  background-color: \${colors.blue1};
  &:disabled {
    background-color: \${colors.gray1};
  }
}

&.Warning {
  background-color: \${colors.orange};
  &:disabled {
    background-color: \${colors.gray1};
  }
  &:hover {
    background-color: \${colors.yellow};
  }
}

&.Error {
  background-color: \${colors.red};
  &:hover {
    background-color: \${colors.orange};
  }
}
`;

  test('It should remove "__#5199" from class name', () => {
    expect(removeAllIds(TEST_1)).toBe('.:disabled {');
  });

  test('It should remove all temporary class identifiers from a complete CSS set', () => {
    expect(removeAllIds(TEST_2)).toBe(EXPECTED);
  });
});
