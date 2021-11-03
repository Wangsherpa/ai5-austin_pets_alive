import React from 'react'
import "./DogInfo.css"

const DogProfile = (props) => {
  const { id, name, sex, age, photo_url, weight, color, dob, breed, memo } = props.info;
  return (
    <div>
      <div class="student-profile py-4">
        <div class="container">
          <div class="row">
            <div class="col-lg-4">
              <div class="card shadow-sm">
                <div class="card-header bg-transparent text-center">
                  <img class="profile_img" src={photo_url} alt="dog dp" />
                  <h2 className=" f1 dark-red">{name}</h2>
                </div>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="card shadow-sm">
                <div class="card-header bg-transparent border-0">
                  <h2 className="f3 white" class="mb-0"><i class="far fa-clone pr-1"></i>General Information</h2>
                </div>
                <div class="card-body pt-0">
                  <table className="table table-bordered center">
                    <tr>
                      <th width="30%">Breed</th>
                      <td width="2%">:</td>
                      <td>{breed}</td>
                    </tr>
                    <tr>
                      <th width="30%">Age</th>
                      <td width="2%">:</td>
                      <td>{age}</td>
                    </tr>
                    <tr>
                      <th width="30%">Sex</th>
                      <td width="2%">:</td>
                      <td>{sex}</td>
                    </tr>
                    <tr>
                      <th width="30%">Color</th>
                      <td width="2%">:</td>
                      <td>{color}</td>
                    </tr>
                    <tr>
                      <th width="30%">Weight (Pounds)</th>
                      <td width="2%">:</td>
                      <td>{weight}</td>
                    </tr>
                    <tr>
                      <th width="30%">Animal ID</th>
                      <td width="2%">:</td>
                      <td>{id}</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div style={{ height: "26px" }}></div>
              <div class="card shadow-sm">
                <div class="card-header bg-transparent border-0">
                  <h2 className="f3 white" class="mb-0"><i class="far fa-clone pr-1"></i>About {name}</h2>
                </div>
                <div class="card-body pt-0">
                  <p class="w-70  tc memo center">{memo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DogProfile;