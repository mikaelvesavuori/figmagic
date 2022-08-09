import { Tokens } from '../../../../bin/contracts/Tokens';
import { getTokenMatch } from '../../../../bin/entities/FigmagicElement/logic/getTokenMatch';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      getTokenMatch();
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should match a non-token match', () => {
    expect(
      getTokenMatch(
        "{ chunky: '8px', fat: '4px', regular: '2px', hairline: '1px' }" as unknown as Tokens,
        'borderWidths',
        'border-width',
        '1px',
        16,
        'rgba'
      )
    ).toEqual(
      expect.objectContaining({
        updatedCss: 'border-width: 1px;\n',
        updatedImports: []
      })
    );
  });

  test('It should match padding', () => {
    expect(
      getTokenMatch(
        {
          huge: '6rem',
          large: '4rem',
          big: '3rem',
          medium: '2rem',
          small: '1rem',
          tiny: '0.5rem'
        },
        'spacing',
        'padding',
        { top: 16, bottom: 16, left: 16, right: 16 },
        16,
        'rgba'
      )
    ).toEqual(expect.objectContaining({}));
  });

  test('It should match non-nested token matches', () => {
    expect(
      getTokenMatch(
        {
          green3: 'rgba(111, 207, 151, 1)',
          green2: 'rgba(39, 174, 96, 1)',
          green1: 'rgba(33, 150, 83, 1)',
          blue3: 'rgba(86, 204, 242, 1)',
          blue2: 'rgba(45, 156, 219, 1)',
          blue1: 'rgba(47, 128, 237, 1)',
          yellow: 'rgba(242, 201, 76, 1)',
          orange: 'rgba(242, 153, 74, 1)',
          red: 'rgba(235, 87, 87, 1)',
          neon: 'rgba(228, 255, 193, 1)',
          gray5: 'rgba(242, 242, 242, 1)',
          gray4: 'rgba(224, 224, 224, 1)',
          gray3: 'rgba(189, 189, 189, 1)',
          gray2: 'rgba(130, 130, 130, 1)',
          gray1: 'rgba(79, 79, 79, 1)',
          white: 'rgba(255, 255, 255, 1)',
          black: 'rgba(51, 51, 51, 1)'
        },
        'colors',
        'background-color',
        `rgba(47, 128, 237, 1)`,
        16,
        'rgba'
      )
    ).toEqual(expect.objectContaining({}));
  });
});
