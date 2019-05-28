import React from "react";

// √𝑥 is a fixed-point of the function 𝑦 ↦ 𝑥/𝑦
function averageDamp(f) {
  return x => averageDamp(x, f(x));
}
export function FunctionsAsReturnedValues() {
  return (
    <div>
      <div>FunctionsAsReturnedValues</div>
      <div>{averageDamp()}s</div>
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
    </div>
  );
}
