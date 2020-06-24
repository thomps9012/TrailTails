import React from 'react';
import '../styles/homePage.css';

function homePage() {
  return (
    <div class="hero">
        <h1 class="display-4">Trail Tails</h1>
        <h2 class="lead">Explore the most popular trails near you and create fond memories with your furry friend</h2>
  
        <h2>Get driving directions, current trail conditions and check weather conditions.</h2>
                <div class='container'>
                <form id="userOptions">
                    <fieldset>
                        <a class="geo-locate"><i class="fas fa-map-marker-alt"></i>Use my current location</a>
                    </fieldset>
                    <fieldset>
                        <input class="location" type="text" placeholder="City, State"></input>
                    </fieldset>
                    <div class="form-wrap">
                        <fieldset>
                            <label for="radius">Radius:</label>
                            <div class="select">
                                <select id="radius" class="radius">
                                    <option value="10">10 Miles</option>
                                    <option value="20">20 Miles</option>
                                    <option value="30">30 Miles</option>
                                    <option value="40">40 Miles</option>
                                    <option value="50">50 Miles</option>
                                </select>
                            </div>
                        </fieldset>
                        <fieldset>
                            <label for="minTrailLength">Min. Length of Trail:</label>
                            <div class="select">
                                <select id="minTrailLength" class="select minTrailLength">
                                    <option selected value="0">No Minimum</option>
                                    <option value="1">1 Miles</option>
                                    <option value="5">5 Miles</option>
                                </select>
                            </div>
                        </fieldset>
                        <fieldset>
                            <label for="avgRating">Min. Average Rating:</label>
                            <div class="avgRating">
                                <span class="fa fa-star checked" value="1"></span>
                                <span class="fa fa-star checked" value="2"></span>
                                <span class="fa fa-star checked" value="3"></span>
                                <span class="fa fa-star" value="4"></span>
                            </div>
                        </fieldset>
                        <fieldset>
                            <button type="submit" class="submit">Let's Go</button>
                        </fieldset>
                    </div>
                </form>
                </div>
            </div>
  );
}

export default homePage;