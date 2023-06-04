import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Head from "next/head";
import { generateShadeNames } from "@/utils";

import {
  ColorBlock,
  ShadesBlock,
  ControlsBlock,
  Sidebar,
  LoadSpinner
} from "@/components";

import styles from "./styles.module.scss";

const HeadContent = () => {
  const ogDescription =
    "Farbtonmacher is a tool that helps you to generate color shades based on your main color.";
  const ogTitle = "Farbtonmacher | Shades generator";
  const ogImage =
    "https://cdn.glitch.global/9d0eadb1-3c61-4e5d-89d6-a2995cbc29b9/og-image.png";

  return (
    <Head>
      <title>{ogTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="./favicon.ico" sizes="any" />
      <link rel="icon" href="./favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="./apple-touch-icon.png" />
      <meta name="description" content={ogDescription} />
      <meta name="Farbtonmacher" content={ogDescription} />

      <meta name="theme-color" content="#4a4a4a"></meta>
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="pavellaptev.github.io" />
      <meta
        property="twitter:url"
        content="https://pavellaptev.github.io/farbtonmacher/"
      />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={ogImage} />

      <script async src="https://cdn.splitbee.io/sb.js"></script>
    </Head>
  );
};

export default function Home() {
  const router = useRouter();

  const defaultSteps = 4;
  const defaultMainColor = "#36EAA9";

  const [mainColor, setMainColor] = useState("");
  const [steps, setSteps] = useState(defaultSteps);
  const [lightShades, setLightShades] = useState<string[]>([]);
  const [darkShades, setDarkShades] = useState<string[]>([]);

  const [lightShadeParams, setLightShadeParams] = useState({
    shadeBrightness: 0,
    shadeSaturation: 0,
    shadeTemperature: 0
  });
  const [darkShadeParams, setDarkShadeParams] = useState({
    shadeBrightness: 0,
    shadeSaturation: 0,
    shadeTemperature: 0
  });

  const updateMainColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setMainColor(color);

    const params = new URLSearchParams(window.location.search);
    params.set("mainColor", color);

    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };

  const setURLParams = (params: URLSearchParams) => {
    const urlConfig = `${window.location.pathname}?${params.toString()}`;

    window.history.replaceState({}, "", urlConfig);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const colorParam = params.get("mainColor");

    if (!colorParam) {
      // set default params
      params.set("mainColor", defaultMainColor);
      setMainColor(defaultMainColor);

      params.set("steps", defaultSteps.toString());
      params.set("dsb", "0");
      params.set("dss", "0");
      params.set("dst", "0");
      params.set("lsb", "0");
      params.set("lss", "0");
      params.set("lst", "0");

      router.push({
        pathname: "/",
        query: params.toString()
      } as any);
    } else {
      setMainColor(colorParam);
      setSteps(parseFloat(params.get("steps") || defaultSteps.toString()));
      setDarkShadeParams({
        shadeBrightness: parseFloat(params.get("dsb") || "0"),
        shadeSaturation: parseFloat(params.get("dss") || "0"),
        shadeTemperature: parseFloat(params.get("dst") || "0")
      });
      setLightShadeParams({
        shadeBrightness: parseFloat(params.get("lsb") || "0"),
        shadeSaturation: parseFloat(params.get("lss") || "0"),
        shadeTemperature: parseFloat(params.get("lst") || "0")
      });
    }
  }, []);

  if (mainColor === "") {
    return (
      <>
        <HeadContent />
        <div className={styles.loadingWrapper}>
          <LoadSpinner />
        </div>
      </>
    );
  }

  return (
    <>
      <HeadContent />
      <main className={styles.wrapper}>
        <section className={styles.main}>
          <section className={styles.colorsPreview}>
            <ShadesBlock
              shades={darkShades}
              names={generateShadeNames("darken", steps)}
            />
            <ColorBlock
              className={styles.mainColorShade}
              color={mainColor}
              name="50"
            />
            <ShadesBlock
              shades={lightShades}
              names={generateShadeNames("lighten", steps)}
            />
          </section>

          <section className={styles.controls}>
            <ControlsBlock
              steps={steps}
              onChange={(props) => {
                setDarkShades(props.shades);
                setDarkShadeParams(props.params);

                const params = new URLSearchParams(window.location.search);
                params.set("dsb", props.params.shadeBrightness.toString());
                params.set("dss", props.params.shadeSaturation.toString());
                params.set("dst", props.params.shadeTemperature.toString());

                setURLParams(params);
              }}
              shadeParams={darkShadeParams}
              mainColor={mainColor}
              direction="darken"
            />
            <section className={styles.colorControlWrap}>
              <div className={styles.mainColorControl}>
                <label
                  htmlFor="main-color-input"
                  className={styles.colorControl}
                >
                  <span className={styles.hexCode}>
                    {mainColor.toUpperCase()}
                  </span>
                  <div
                    className={styles.colorPreview}
                    style={{
                      backgroundColor: mainColor
                    }}
                  />
                  <input
                    id="main-color-input"
                    type="color"
                    value={mainColor}
                    onChange={updateMainColor}
                  />
                </label>
              </div>
            </section>

            <ControlsBlock
              steps={steps}
              onChange={(shades) => {
                setLightShades(shades.shades);
                setLightShadeParams(shades.params);

                const params = new URLSearchParams(window.location.search);
                params.set("lsb", shades.params.shadeBrightness.toString());
                params.set("lss", shades.params.shadeSaturation.toString());
                params.set("lst", shades.params.shadeTemperature.toString());

                setURLParams(params);
              }}
              shadeParams={lightShadeParams}
              mainColor={mainColor}
              direction="lighten"
            />
          </section>
        </section>

        <Sidebar
          steps={steps}
          onStepsChange={() => {
            const params = new URLSearchParams(window.location.search);
            params.set("steps", steps.toString());

            setURLParams(params);
          }}
          onPlusClick={() => {
            setSteps(steps + 1);
          }}
          onMinusClick={() => {
            if (steps > 1) {
              setSteps(steps - 1);
            }
          }}
        />
      </main>
    </>
  );
}
