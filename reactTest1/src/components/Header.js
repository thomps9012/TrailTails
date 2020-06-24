import React from "react";

function Header() {
  return (
    <style
    <form>
      <div class="form-row align-items-center">
        <div class="col-auto">
        <label class="sr-only" for="inlineFormInput">Username</label>
        <input type="text" class="form-control mb-2" id="inlineFormInput" placeholder="Username">
      </div>
      
      <div class="col-auto">
      <label class="sr-only" for="inlineFormInputGroup">Password</label>
        <div class="input-group mb-2">
        <div class="input-group-prepend">
          <div class="input-group-text">Password</div>
        </div>
        <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="*********">
      </div>
    </div>
    <div class="col-auto">
      <div class="form-check mb-2">
        <input class="form-check-input" type="checkbox" id="autoSizingCheck">
        <label class="form-check-label" for="autoSizingCheck">
          Remember me
        </label>
      </div>
    </div>
    <div class="col-auto">
      <button type="submit" class="btn btn-primary mb-2">Submit</button>
    </div>
  </div>
</form>
  );
}

export default Header;
