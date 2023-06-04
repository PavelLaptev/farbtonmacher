import { ImageResponse } from "next/server";

// Route segment config
export const config = {
  runtime: "edge"
};

// Image metadata
export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

const OgImage = ({ color }: { color: string | null }) => {
  const getColor = () => {
    if (color) {
      return color;
    }

    return "#36EAA9";
  };

  return (
    <div
      style={
        {
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
          backgroundColor: getColor()
        } as React.CSSProperties
      }
    >
      <span>FARBTONEMACHER</span>
    </div>
  );
};

const handler = async (props: { url: string }) => {
  const { searchParams } = new URL(props.url);
  const color = searchParams.get("color");

  try {
    return new ImageResponse(<OgImage color={color} />, {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size
    });
  } catch {
    return new Response(`Failed to generate the image`, {
      status: 500
    });
  }
};

export default handler;
