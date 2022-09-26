import { memo, useRef, useEffect } from "react";

const AdServer = () => {
  const script = `<script type="text/javascript">
        amzn_assoc_ad_type = "banner"; amzn_assoc_marketplace = "amazon";
        amzn_assoc_region = "US"; amzn_assoc_placement =
        "assoc_banner_placement_default"; amzn_assoc_campaigns =
        "amazonfashion"; amzn_assoc_banner_type = "category";
        amzn_assoc_isresponsive = "true"; amzn_assoc_banner_id =
        "16WMC1S47DJG0A0MEW82"; amzn_assoc_tracking_id = "budgeteeer-20";
        amzn_assoc_linkid = "c43d7c788849d4015cdcdd808db9138c";
      </script>
      <script src="//z-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&Operation=GetScript&ID=OneJS&WS=1"></script>
`;

  const InjectScript = memo(({ script }) => {
    const divRef = useRef(null);

    useEffect(() => {
      if (divRef.current === null) {
        return;
      }
      // create a contextual fragment that will execute the script
      // beware of security concerns!!
      const doc = document.createRange().createContextualFragment(script);

      // clear the div HTML, and append the doc fragment with the script
      divRef.current.innerHTML = "";
      divRef.current.appendChild(doc);
    });

    return <div ref={divRef} />;
  });

  return (
    <div className="alignleft">
      <InjectScript script={script} />
    </div>
  );
};

export default AdServer;
