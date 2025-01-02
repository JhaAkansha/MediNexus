import './doctorRegistration.css';
function doctorRegistration () {
    return (
        <form id="doctorSignUpForm" /*onSubmit={handleSubmit}*/>
            <div className='doctor-info'>Enter your information</div>
            <div className='descriptive-text'> "Please provide your specialty and a brief description about yourself. This information will be displayed on your profile to help patients understand your expertise and choose the doctor that best suits their needs.</div>
            <input placeholder='Speciality' type='text' className='speaciality'required />
            <textarea
            type = "text"
            name = 'experience'
            className='Description'
            // value={formData.experience}
            // onChange = {handleChange}
            autoCapitalize = "sentences"
            placeholder='Description'>
            </textarea>
            <button className="submit" type="submit">Submit</button>
          </form>
    );
}

export default doctorRegistration;