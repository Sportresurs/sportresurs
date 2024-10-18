import Smile from "../../../public/img/smiley-icon.png";
import BasketballCourt from "../../../public/img/basketballCourt.png";
import TennisCourt from "../../../public/img/tennisCourt.png";
import FootballCourt from "../../../public/img/footballCourt.png";
import HandballCourt from "../../../public/img/handballCourt.png";
import VolleyballCourt from "../../../public/img/volleyballCourt.png";
import GymnasticCourt from "../../../public/img/gymnasticCourt.png";
import SwimmingPool from "../../../public/img/swimming_pool.png";
import SkatePark from "../../../public/img/skate_park.png";
import MartialArts from "../../../public/img/martial_arts.png";
import Workout from "../../../public/img/workout.png";
import Regbi from "../../../public/img/regbi.png";
import Petank from "../../../public/img/petank.png";
import Florball from "../../../public/img/florball.png";
import Badminton from "../../../public/img/badminton.png";

const selectIconPurpose = (courtPurpose) => {
  const icon =
    {
      гандбол: HandballCourt,
      баскетбол: BasketballCourt,
      теніс: TennisCourt,
      футбол: FootballCourt,
      волейбол: VolleyballCourt,
      гімнастика: GymnasticCourt,
      плавання: SwimmingPool,
      скейтпарк: SkatePark,
      єдиноборство: MartialArts,
      воркаут: Workout,
      регбі: Regbi,
      петанк: Petank,
      флорбол: Florball,
      бадмінтон: Badminton,
    }[courtPurpose[0]?.title.toLowerCase()] || Smile;

  return icon;
};

export default selectIconPurpose;
