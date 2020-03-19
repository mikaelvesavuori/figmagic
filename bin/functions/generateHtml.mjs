export function generateHtml(css) {
  // Compress string
  let z = css.replace(/\t/gi, '');
  z = css.replace(/\n/gi, '');
  z = css.replace(/\s/gi, '');

  const x = z.match(/(\.[A-Za-z0-9])\w+\{/gi);

  const MATCHES = [];

  let markup = '';

  x.forEach(a => {
    //MATCHES.push(a.replace(/[.{]/gi, ''));
    const x = a.replace(/[.{]/gi, '');
    markup += `<div class="${x}"></div>`;
  });

  console.log('MATCHES', MATCHES);

  //MATCHES.forEach(x => {
  //  markup += `<div class="${x}"></div>`;
  //});

  return markup;
}

const testdata = `
.ModalText {
	background-color: rgba(0, 0, 0, 0);
	width: 408px;
	height: 75px;
	font-family: 'Helvetica Neue';
	font-weight: 400;
	font-size: 16px;
	letter-spacing: 0;
	text-align: LEFT;
	line-height: 18.75px;
	}

	.ModalImage {
	background-color: rgba(0, 0, 0, 0);
	width: 408px;
	height: 250px;
	}

	.Button {
	background-color: rgba(33, 150, 83, 1);
	width: 408px;
	height: 64px;
	border-radius: 8px;
	font-family: 'Helvetica Neue';
	font-weight: 500;
	font-size: 16px;
	letter-spacing: 0;
	text-align: CENTER;
	line-height: 18.75px;
	}
`;

//generateHtml(testdata);
