import React, { useEffect, useState } from "react";
import api from "../../../api";
import { useParams, useHistory } from "react-router-dom";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "./backButton";

const UsersEdit = () => {
  const params = useParams();
  const { userId } = params;
  const [user, setUser] = useState(null);
  const [professions, setProfession] = useState();
  const [qualities, setQualities] = useState({});
  const history = useHistory();
  useEffect(() => {
    api.users.getById(userId).then((user) => setUser(user));
  }, []);
  console.log(user);
  useEffect(() => {
    api.professions.fetchAll().then((professions) => setProfession(professions));
  }, []);
  useEffect(() => {
    api.qualities.fetchAll().then((qualities) => setQualities(qualities));
  }, []);
  const handleProfessionChange = ({ value }) => {
    const profession = Object.values(professions).find((prof) => {
      return value === prof._id;
    });
    if (profession === undefined) {
      return;
    }
    setUser({ ...user, profession });
  };

  const handleChange = ({ name, value }) => {
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    api.users.update(userId, user).then((user) => {
      setUser(user);
      history.push(`/users/${userId}`);
    });
  };
  return (
    user && (
      <div className="container mt-5">
        <BackHistoryButton />
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <form className="preference" onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
              <TextField
                label="Электронная почта"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
              <SelectField
                label="Выберете свою профессию"
                defaultOption="Choose..."
                name="profession"
                options={professions}
                onChange={handleProfessionChange}
                value={user.profession.id}
              />
              <RadioField
                options={[
                  { name: "Male", value: "male" },
                  { name: "Female", value: "female" },
                  { name: "Other", value: "other" }
                ]}
                value={user.sex}
                name="sex"
                onChange={handleChange}
                label="Выберете ваш пол"
              />
              <MultiSelectField
                options={qualities}
                onChange={handleChange}
                defaultValue={user.qualities}
                name="qualities"
                label="Выберете ваши качества"
              />
              <button className="btn btn-primary w-100 mx-auto">
                Обновить
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};
export default UsersEdit;
