export const generateColorShades = ({
  color,
  steps,
  direction,
  shadeBrightness,
  shadeSaturation,
  shadeContrast,
  shadeTemperature
}: {
  color: string;
  steps: number;
  direction: "lighten" | "darken";
  shadeBrightness: number;
  shadeSaturation: number;
  shadeContrast: number;
  shadeTemperature: number;
}) => {
  const [h, s, l] = hexToHsl(color);
  // console.log("shadeHue", shadeHue);

  const shades = Array.from({ length: steps }, (_, i) => {
    // Calculate the adjusted saturation for the current shade
    const adjustSaturation = () => {
      const saturation = s + -s * ((shadeSaturation * (-i + 1)) / steps);

      if (saturation > 100) {
        return 100;
      }

      if (saturation < 0) {
        return 0;
      }

      return saturation;
    };

    const adjustHue = () => {
      const adjustedHue = h + shadeTemperature;

      console.log("adjustedHue", adjustedHue);

      return adjustedHue;
    };

    const contrast = generateExponentialArray(steps, shadeContrast);

    // console.log(contrast);

    if (direction === "lighten") {
      const stepSize = l / (steps * (steps / 2));
      const stepSizeWithSmoothness = stepSize + stepSize * shadeBrightness;

      const newLightness = l + stepSizeWithSmoothness * ++i;

      return hslToHex(h, adjustSaturation(), cutLightness(newLightness));
    }

    if (direction === "darken") {
      const stepSize = ((l - l / steps) / steps) * contrast[i];

      // console.log(contrast);
      const stepSizeWithSmoothness = stepSize + stepSize * shadeBrightness;

      const newLightness = l - stepSizeWithSmoothness * ++i;

      return hslToHex(
        adjustHue(),
        adjustSaturation(),
        cutLightness(newLightness)
      );
    }
  });

  return direction === "lighten" ? shades : shades.reverse();
};

const generateExponentialArray = (
  totalAmount: number,
  exponentialRatio: number
) => {
  const values = [];

  for (let i = 0; i < totalAmount; i++) {
    let exponentialVariant;

    if (exponentialRatio === 0) {
      exponentialVariant = 1; // Set all values to 1 when exponentialRatio is 0
    } else if (exponentialRatio > 0) {
      const normalizedIndex = i / (totalAmount - 1); // Normalize index to the range of 0 to 1
      exponentialVariant = Math.pow(normalizedIndex, exponentialRatio);
    } else {
      const normalizedIndex = i / (totalAmount - 1); // Normalize index to the range of 0 to 1
      exponentialVariant = Math.pow(
        1 + normalizedIndex / 2,
        Math.abs(exponentialRatio)
      );
    }

    values.push(exponentialVariant);
  }

  if (exponentialRatio < 0) {
    values.reverse();
  }

  return values;
};

const cutLightness = (number: number) => {
  if (number > 100) {
    return 100;
  }

  if (number < 0) {
    return 0;
  }

  return number;
};

export function hexToHsl(hex: string): [number, number, number] {
  // Convert hex to RGB
  const r = parseInt(hex.substring(1, 3), 16) / 255;
  const g = parseInt(hex.substring(3, 5), 16) / 255;
  const b = parseInt(hex.substring(5, 7), 16) / 255;

  // Find min and max values of RGB
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (min + max) / 2;

  if (delta !== 0) {
    if (l < 0.5) {
      s = delta / (max + min);
    } else {
      s = delta / (2 - max - min);
    }

    if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = 2 + (b - r) / delta;
    } else if (b === max) {
      h = 4 + (r - g) / delta;
    }

    h *= 60;
    if (h < 0) {
      h += 360;
    }
  }

  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number) {
  // Convert the hue to a value between 0 and 1
  h /= 360;

  // Convert the saturation and lightness to a value between 0 and 1
  s /= 100;
  l /= 100;

  // Calculate the RGB values
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hueToRGB = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hueToRGB(p, q, h + 1 / 3);
    g = hueToRGB(p, q, h);
    b = hueToRGB(p, q, h - 1 / 3);
  }

  // Convert the RGB values to HEX
  const toHex = (c: number) => {
    const hex = Math.round(c * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  return hexColor;
}

export function roundToNearestMultiple(num: number) {
  const remainder = num % 5;
  if (remainder <= 2.5) {
    return num - remainder;
  } else {
    return num + (5 - remainder);
  }
}

export function interpolateTo100(totalItems: number, itemIndex: number) {
  // Calculate the interpolation value
  const interpolationValue = (itemIndex / (totalItems - 1)) * 100;
  const roundedInterpolationValue = roundToNearestMultiple(interpolationValue);

  return roundedInterpolationValue;
}
