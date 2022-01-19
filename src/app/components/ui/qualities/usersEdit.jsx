import React, { useEffect, useState } from "react";
import api from "../../../api";
import { useParams } from "react-router-dom";
import TextField from "../../common/form/textField";
// import SelectField from "../../common/form/selectField";
const UsersEdit = () => {
  const params = useParams();
  const { userId } = params;
  const [user, setUser] = useState(null);
  // const [professions, setProfession] = useState();
  useEffect(() => {
    api.users.getById(userId).then((user) => setUser(user));
  }, []);
  console.log(user);
  // useEffect(() => {
  //   api.professions.fetchAll().then((professions) => {
  //     setProfession(professions);
  //   });
  // }, []);

  const handleChange = ({ name, value }) => {
    setUser({ ...user, [name]: value });
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <TextField
            label="Имя"
            name="name"
            // value={user.name}
            onChange={handleChange}
          />
          <TextField
            label="Электронная почта"
            name="email"
            // value={user.email}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};
export default UsersEdit;
