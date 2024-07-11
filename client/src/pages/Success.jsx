import React from 'react'

const Success = () => {
  return (
    <div>
      <div class="container">
        <div class="jumbotron">
          <h1 class="text-primary text-center">
            <span class="fa fa-user"></span> Profile Information
          </h1>
          <div class="row">
            <div class="col-sm-6">
              <div class="well">
                <div>
                  <img src="" alt="" srcset="" />
                </div>
                <p>
                  <strong>Id</strong>: {user.id}
                  <br />
                  <strong>Email</strong>: {user.email}
                  <br />
                  <strong>Name</strong>: {user.displayName}
                </p>
              </div>
              <div>
                <a href="/auth/google/signout" class="btn btn-danger">
                  <span class="fa fa-user"></span> Sign Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success