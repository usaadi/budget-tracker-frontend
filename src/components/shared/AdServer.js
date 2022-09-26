import useWindowSize from "../../lib/hooks/useWindowSize";

const AdServer = () => {
  const md = 768;
  const lg = 1024;
  const windowSize = useWindowSize();
  let screenForm = "";

  if (!windowSize) {
    screenForm = "";
  } else if (windowSize.width < md) {
    screenForm = "sm";
  } else if (windowSize.width < lg) {
    screenForm = "md";
  } else {
    screenForm = "lg";
  }

  return (
    <>
      {screenForm === "md" || screenForm === "lg" ? (
        <div className="tw-flex tw-justify-center tw-items-center tw-mb-12px lg:tw-mb-32px">
          <iframe
            title="ad-large"
            src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=48&l=ur1&category=amazonfashion&banner=16WMC1S47DJG0A0MEW82&f=ifr&linkID=a882b18738729ef877e4dcbc85a750e5&t=budgeteeer-20&tracking_id=budgeteeer-20"
            width="728"
            height="90"
            scrolling="no"
            border="0"
            marginwidth="0"
            style={{ border: "none" }}
            frameborder="0"
            sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"
          ></iframe>
        </div>
      ) : (
        <div className="tw-flex tw-justify-center tw-items-center tw-mb-12px">
          <iframe
            title="ad-small"
            src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=288&l=ur1&category=amazonfashion&banner=0TZ9JY8VCY3R51XPP8G2&f=ifr&linkID=3513ece1258baa2393162976519dd3f0&t=budgeteeer-20&tracking_id=budgeteeer-20"
            width="320"
            height="50"
            scrolling="no"
            border="0"
            marginwidth="0"
            style={{ border: "none" }}
            frameborder="0"
            sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default AdServer;
