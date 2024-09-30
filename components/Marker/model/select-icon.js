import BasketballCourt from "../../../public/img/basketballCourt.png";
import TennisCourt from "../../../public/img/tennisCourt.png";
import ChildCourt from "../../../public/img/childCourt.png";
import FootballCourt from "../../../public/img/footballCourt.png";
import HandballCourt from "../../../public/img/handballCourt.png";
import VolleyballCourt from "../../../public/img/volleyballCourt.png";
import GymnasticCourt from "../../../public/img/gymnasticCourt.png";
import WithoutTypeCourt from "../../../public/img/withoutTypeCourt.png";
import Gym from "../../../public/img/gym.png";
import Stadium from "../../../public/img/stadium.png";
import SwimmingPool from "../../../public/img/swimming_pool.png";
import SkatePark from "../../../public/img/skate_park.png";
import MartialArts from "../../../public/img/martial_arts.png";
import Workout from "../../../public/img/workout.png";
import Inclusive from "../../../public/img/inclusive.png";

const selectIconPurpose = (courtPurpose) => {
  const icon =
    {
      гандбольний: HandballCourt,
      дитячий: ChildCourt,
      баскетбольний: BasketballCourt,
      тенісний: TennisCourt,
      футбольний: FootballCourt,
      волейбольний: VolleyballCourt,
      гімнастичний: GymnasticCourt,
      спортзал: Gym,
      стадіон: Stadium,
      басейн: SwimmingPool,
      скейтпарк: SkatePark,
      єдиноборства: MartialArts,
      воркаут: Workout,
      інклюзивний: Inclusive,
      "з елементами інклюзії": Inclusive,
    }[courtPurpose[0]?.title] || WithoutTypeCourt;

  return icon;
};

export default selectIconPurpose;
