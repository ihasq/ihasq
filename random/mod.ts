const BUF_SIZE = 1024;
const RAND_BUF = crypto.getRandomValues(new Uint8Array(BUF_SIZE));

let index = 0;

const getBufferFragment = (): number => {
	if(index == BUF_SIZE) {
		crypto.getRandomValues(RAND_BUF);
		index = 0;
	};
	return RAND_BUF[index++];
};

export const random = (length: number = 16, sample: string = "0123457689abcdefghijklmnopqrstuvwxyz"): string => {
	const SAMPLE_LENGTH = sample.length;
	return Array(length)
		.fill(0)
		.map(getBufferFragment)
		.map(x => sample[Math.floor((x / 255) * SAMPLE_LENGTH)])
		.join("")
	;
};