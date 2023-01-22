import React from "react";
import { Component } from 'react';
import $ from 'jquery'

class Dogs extends Component{
    state = {
        img:'',
        img_list:[],
        rating_list:[],
        loading: true,
        disabled:false,
        disabledfilter:false,
        breed:['All'],
        table_page:false
    }
    
    displayPicture = (event) => {
        const imageUrl = "https://dog.ceo/api/breeds/image/random";
        fetch(imageUrl)
        .then(response => response.json())
        .then(response => {
              if (response.status == 'success') {  
                this.setState(() => { return {
                    img:response.message,
                    table_page:true
            }}); }})
        if (this.state.img!=='' && document.querySelector('input[name="rating"]:checked')!==null){
        (this.state.img_list.push(this.state.img)&&
        this.state.rating_list.push((parseInt( document.querySelector('input[name="rating"]:checked').value)+10).toString())
        )}
        if (this.state.img!=='' && document.querySelector('input[name="rating"]:checked')===null){{
            this.state.img_list.push(this.state.img) && this.state.rating_list.push('10')
        }}
        var ratings = document.getElementsByName('rating');
        ratings.forEach(function(element)
        {element.checked=false})
    }

    displayHistory = (event) => {
        if (this.state.disabled) {
            return;
        }
        else{
        var section = document.getElementById("rate-page");
        section.style.display = 'none'
        var section = document.getElementById("table-page");
        section.style.visibility = 'visible'
        this.setState({disabled: true});
        var table = document.getElementById("table-id");
        var row = table.insertRow(0)
        var cell1= row.insertCell(0)
        cell1.innerHTML = 'Rating'
        var cell2 = row.insertCell(1)
        cell2.innerHTML = 'Dog'  
        for (let i = 0; i < this.state.rating_list.length; i++) {
                var row1 = table.insertRow(1)
                row1.insertCell().innerHTML = this.state.rating_list[i] + ' out of 10 '
                var img = document.createElement('img');
                img.src = this.state.img_list[i]
                row1.appendChild(img);
                if (!this.state.breed.includes(this.state.img_list[i].split('breeds/').pop().split('/')[0])){
                    this.state.breed.push(this.state.img_list[i].split('breeds/').pop().split('/')[0])
            } 
        }
    }}

    sortTable() {
    var table, i, x, y;
    table = document.getElementById("table-id");
    var switching = true;
    while (switching) {
        switching = false;
        var rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            var Switch = false;
            x = rows[i].getElementsByTagName("TD")[0];
            y = rows[i + 1].getElementsByTagName("TD")[0];
            if (parseInt(x.innerHTML.toLowerCase().substr(0, 2)) > parseInt(y.innerHTML.toLowerCase().substr(0, 2))){
                Switch = true;
                break;
            }
        }
        if (Switch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }}
    }
    filterTable() {
        var dropdown, filter, table, td, i;
        table = document.getElementById("table-id");
        dropdown = document.getElementById("drop-down");
        console.log('filter',table)
        filter = dropdown.value;
        console.log('filter',filter)
        var rows = table.rows;
        if (filter ==='All') {
        for (i = 1; i < (rows.length); i++) {
        console.log('ros',rows[i])

            rows[i].style.display = '';
        }}
        else{
        for (i = 1; i < (rows.length ); i++) {
            td = rows[i].innerHTML.split('breeds/').pop().split('/')[0];
            if (filter===td) {
            rows[i].style.display = "";
            } 
            else{  rows[i].style.display='none'
            }}
        }
    }

    Rate = (event) => {
        this.setState(() => { return {
            loading : false}})
    this.displayPicture()
    }

  render(){

    console.log('list',this.state.rating_list)
    console.log('list',this.state.breed)
    return (
        <>
        {this.state.loading ? (<div
                id="welcome"
                className="Rate-Dog">
                <div key="0">Welcome to Rate My Dog</div>
                <button id='submit' type="submit" onClick={this.Rate} >Start</button>
                </div>)
    : 
        <div className="websiteBody">
            {this.state.img !==''? (
            <div>
                <section id='rate-page'>
                <div
                id="Rate-Dog1"
                className="Rate-Dog">
                <div key="0">Rate My Dog</div>
                </div>
                <img id='img-principal' src={this.state.img}/>
                <div>
                <div class="center">
				<fieldset class="rating">
					<input type="radio" id="star5" name="rating" value="5"/><label for="star5" class="full" title="Awesome"></label>
					<input type="radio" id="star4" name="rating" value="4"/><label for="star4" class="full"></label>
					<input type="radio" id="star3" name="rating" value="3"/><label for="star3" class="full"></label>
					<input type="radio" id="star2" name="rating" value="2"/><label for="star2" class="full"></label>
					<input type="radio" id="star1" name="rating" value="1"/><label for="star1" class="full"></label>
				</fieldset>
			</div>
			<h4 id="rating-value"></h4>
                <div>
                    <button id='submit1' type="submit" onClick={this.displayPicture} disabled={this.state.disabled}>Submit</button>
                </div>
                </div>
                <div>
                    <button id='history' type="submit" onClick={this.displayHistory} disabled={this.state.disabled}>View History</button>
                </div></section>
                <section id='table-page'>
                <div className="table">
                <div 
                className="history-rate">History</div>

                <button id='sort' type="submit" onClick={this.sortTable} >Sort</button>
                <div><select id='drop-down' type="submit" onChange={this.filterTable} style={{textAlign:'center'}}>Filter
                {this.state.breed.map((option, index) => (
                    <option key={index} value={option}>
                    {option}
                    </option>
                ))}
                    </select></div>
                    <table class='table-sort' id='table-id'>
                    </table>
                </div></section>
        </div>):<></>}
        </div>}
        </>
          
    );
  }}
  
export default Dogs;
  
