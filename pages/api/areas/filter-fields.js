import { withSentry } from "@sentry/nextjs";
import nextConnect from "next-connect";
import { District, Purpose } from "../../../models/index";

const formatTitle = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const handler = nextConnect().get(async (req, res) => {
  try {
    const districts = await District.findAll({
      attributes: ["name"],
    });

    const purposes = await Purpose.findAll({
      attributes: ["title"],
    });

    const districtNames = districts.map((district) => district.name);
    const purposeTitles = purposes
      .map((purpose) => formatTitle(purpose.title))
      .filter((value, index, self) => self.indexOf(value) === index);

    return res.status(200).json({
      districts: districtNames,
      purposes: purposeTitles,
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

export default withSentry(handler);
