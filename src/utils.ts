export function generateColorShades(
  hexColor: string,
  amount: number,
  direction: "lighten" | "darken",
  dimmingSteps: number
): string[] {
  // Remove the '#' symbol from the input HEX color
  hexColor = hexColor.replace("#", "");

  // Convert the HEX color to RGB
  const hexToRgb = (hex: string): number[] =>
    // @ts-ignore
    hex.match(/[a-fA-F0-9]{2}/g).map((val) => parseInt(val, 16));

  // Convert the RGB color to HEX
  const rgbToHex = (rgb: number[]): string =>
    "#" + rgb.map((val) => val.toString(16).padStart(2, "0")).join("");

  // Calculate the color difference for lightening or darkening
  const calculateColorDifference = (
    color: number,
    difference: number,
    direction: "lighten" | "darken"
  ): number => {
    if (direction === "lighten") {
      return Math.min(color + difference, 255);
    } else {
      return Math.max(color - difference, 0);
    }
  };

  // Generate color shades based on the direction and dimming steps
  const shades: string[] = [];
  const rgbColor: number[] = hexToRgb(hexColor);
  const difference = Math.floor(255 / (amount + 1));
  const dimmingIncrement = difference / dimmingSteps;

  for (let i = 1; i <= amount; i++) {
    let shadedRgbColor = rgbColor.map((color) => color);
    let dimmingValue = 0;

    for (let j = 0; j < dimmingSteps; j++) {
      if (direction === "lighten") {
        shadedRgbColor = shadedRgbColor.map((color) =>
          calculateColorDifference(color, dimmingValue, direction)
        );
      } else {
        shadedRgbColor = shadedRgbColor.map((color) =>
          calculateColorDifference(color, dimmingValue, direction)
        );
      }
      dimmingValue += dimmingIncrement;
    }

    const shadedHexColor: string = rgbToHex(shadedRgbColor);
    shades.push(shadedHexColor);
  }

  return shades;
}

// Example usage
const shades = generateColorShades("#FF0000", 5, "lighten", 5);
console.log(shades); // ["#ff1919", "#ff3333", "#ff4c4c", "#ff6666", "#ff7f7f"]
