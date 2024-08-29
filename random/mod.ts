const BUF_SIZE = 1024;
const RAND_BUF = crypto.getRandomValues(new Uint8Array(BUF_SIZE));

let index = 0;

const getBufferFragment = (): number => RAND_BUF[
	
	index == BUF_SIZE

		? ((): number => {
			crypto.getRandomValues(RAND_BUF);
			return index = 0;
		})()

		: index++

];

export const random = (

	length: number = 16,
	sample: string = "0123457689abcdefghijklmnopqrstuvwxyz",
	sampleLength: number = sample.length,

): string => Array(length)
	.fill(0)
	.map(getBufferFragment)
	.map(x => sample[Math.floor((x / 255) * sampleLength)])
	.join("")
;