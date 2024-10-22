import { $ } from "./mod.ts";

const counter = $(0);

console.log(counter.$);

counter.watch($ => console.log($))

counter.$++;