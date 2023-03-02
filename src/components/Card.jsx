import { useEffect, useState } from "react";

const Card = (props) => {
  const [isAdopted, setIsAdopted] = useState(props.value.adopted);
  const handleAdoptedPet = () => {
    setIsAdopted(true);
    console.log(isAdopted);
  };

  useEffect(() => {}, [isAdopted]);

  return (
    <div className={props.className}>
      <div className="entete">
        <span>{props.value.name}</span>
        <span className={isAdopted ? "badge-red" : "badge-green"}>
          {isAdopted ? "adopted" : "availble"}
        </span>
      </div>
      <div className="photo">
        <img src={props.value.photo} alt="" />
      </div>
      <div className="footer">
        <div className="info">
          <p>type: {props.value.type}</p>
          <p>location: {props.value.location}</p>
        </div>
        <button disabled={isAdopted} onClick={handleAdoptedPet}>
          TAKE IT
        </button>
      </div>
    </div>
  );
};

export default Card;
