import React, { useState, useEffect } from 'react';
import { api } from './Api';

const Formdata=()=>{
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        age:'',
        city:'',
        country:'',
        state:'',
        dateOfBirth: '',
      });
      
      const [countries,setCountries]=useState({
      country:[],
      city:[],
      state:[]
    })
      const [errors, setErrors] = useState({});
      const [message,setMessage]=useState(false)
      const [countriesName,setCountriesName]=useState("country")

    useEffect(()=>{
            const fetchData = async () => {
              try {
                const response = await fetch(`${api}user/country?name=${countriesName}`); // Replace with your API endpoint
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                const result = await response.json();
                if(countriesName=="country"){
                  setCountries({country:result.data})
              }
             else if (countriesName=="state"){
                setCountries({...countries,state:result.data})

              }else if (countriesName=="city") {
                setCountries({...countries,city:result.data})
              }
              } catch (error) {
                console.log(error)
              } 
            };
        
            fetchData();
    },[countriesName])


      const validateForm = () => {
        let isValid = true;
        const newErrors = {};
    
        // First Name validation
        if (!formData.firstName.match(/^[A-Za-z]+$/i)) {
          newErrors.firstName = 'Must accept alphabets only';
          isValid = false;
        }
    
        // Last Name validation
        if (!formData.lastName.match(/^[A-Za-z]+$/i)) {
          newErrors.lastName = 'Must accept alphabets only';
          isValid = false;
        }
    
        // Email validation
        if (!formData.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i)) {
          newErrors.email = 'Must accept valid email format';
          isValid = false;
        }
    
        // Gender validation
        if (!formData.gender) {
          newErrors.gender = 'Gender is required';
          isValid = false;
        }
    
         // country validation
         if (!formData.country) {
            newErrors.country = 'country is required';
            isValid = false;
          }


        // state validation
        if (!formData.state) {
            newErrors.state = 'state is required';
            isValid = false;
        }

         // city validation
         if (!formData.city) {
            newErrors.city = 'city is required';
            isValid = false;
        }

        // Date of Birth validation
        if (!formData.dateOfBirth || !validateDate(formData.age)) {
          newErrors.dateOfBirth = 'Must be older than 14 years and less than 99 years';
          isValid = false;
        }
    
        setErrors(newErrors);
        return isValid;
      };
    

      const validateDate = (age) => {
        if(age>0&&age>14&&age<99){
            return true
        }else{
            return false
        }
      };
    
      const handleSubmit =async (e) => {
        try{
          e.preventDefault();
          if (validateForm()) {
            console.log(formData,"checkcheck")
            // Handle form submission
            const postFrom = await fetch(`${api}user/postFormData`, {
              method: "POST",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({...formData})
            })
          const postFromData = await postFrom.json();
          if (postFromData.status === 1) {
              setFormData({  
              firstName: '',
              lastName: '',
              email: '',
              gender: '',
              age:'',
              city:'',
              country:'',
              state:'',
              dateOfBirth: ''})
              setMessage(true)
              setTimeout(() => {
                setMessage(false)
              }, 3000);


          } else {
            console.log("the from is not submit")

          }
            console.log(formData);
          } else {
            console.log('Form has errors');
          }
        }catch(e){
          console.log("something went wrong")
        }
      };

      const handleDateOfBirth=(date)=>{
          // const age=validateDate(date.target.value).age;
          const startDate = new Date(date.target.value);
          const endDate = new Date();
          const timeDiff = endDate - startDate;
          // Convert time difference to years
          const yearsDiff = timeDiff / (1000 * 60 * 60 * 24 * 365.25);
         setFormData({ ...formData, age: Math.floor(yearsDiff),dateOfBirth: date.target.value })
      }

    return(
        <>
        <h1>fromValidation</h1>

    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input
          type="text"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        />
        {errors.firstName && <p>{errors.firstName}</p>}
      </div>

      <div>
        <label>Last Name</label>
        <input
          type="text"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        />
        {errors.lastName && <p>{errors.lastName}</p>}
      </div>

      <div>
        <label>Email</label>
        <input
          type="text"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      
      <label htmlFor="countryDropdown">Select a country:</label>
      <select id="countryDropdown" value={formData.country} onChange={(e) =>[setFormData({ ...formData, country: e.target.value,state:'',city:'' }),setCountriesName("state")]}>
        <option value="">Select...</option>
        {countries.country.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}

      </select>
     {errors.country && <p>{errors.country}</p>}

      <label htmlFor="countryDropdown">Select a state:</label>
      <select id="countryDropdown" value={formData.state} onChange={(e) => [setFormData({ ...formData, state: e.target.value }),setCountriesName("city")]}>
        <option value="">Select...</option>
        {countries.state&&countries.state.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
      {errors.state && <p>{errors.state}</p>}


      <label htmlFor="countryDropdown">Select a city:</label>
      <select id="countryDropdown" value={formData.city} onChange={(e) => [setFormData({ ...formData, city: e.target.value }),setCountriesName("city")]}>
        <option value="">Select...</option>
        {countries.city&&countries.city.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
      {errors.city && <p>{errors.city}</p>}

      <div>
        <label>Gender</label>
        <div className='gender'>
          <label>
            <input
              type="radio"
              value="male"
              checked={formData.gender === 'male'}
              onChange={() => setFormData({ ...formData, gender: 'male' })}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              value="female"
              checked={formData.gender === 'female'}
              onChange={() => setFormData({ ...formData, gender: 'female' })}
            />
            Female
          </label>
        </div>
        {errors.gender && <p>{errors.gender}</p>}
      </div>

      <div>
        <label>Date of Birth</label>
        <input 
        type='Date'
        value={formData.dateOfBirth}
        onChange={(date) =>handleDateOfBirth(date)}
        />
        {errors.dateOfBirth && <p>{errors.dateOfBirth}</p>}
      </div>

      <div>
        <label>Age</label>
        <input 
        type='number'
        value={formData.age}
        disabled
        />
        {errors.age && <p>{errors.age}</p>}
      </div>

      <button type="submit">Submit</button>
      {message?<p className='message'>the form is submited</p>:""}
    </form>

        </>
    )
}

export default Formdata;