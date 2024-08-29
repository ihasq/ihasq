const BUF_SIZE = 1024;
const RAND_BUF = crypto.getRandomValues(new Uint8Array(BUF_SIZE));

let index = 0;

const getBufferFragment = () => {
	if(index == BUF_SIZE) {
		crypto.getRandomValues(RAND_BUF);
		index = 0;
	};
	return RAND_BUF[index++];
};

export const random = (length = 16, sample = "0123457689abcdefghijklmnopqrstuvwxyz") => {
	const SAMPLE_LENGTH = sample.length;
	return Array(length)
		.fill(0)
		.map(getBufferFragment)
		.map(x => sample[Math.floor((x / 255) * SAMPLE_LENGTH)])
		.join("")
	;
};