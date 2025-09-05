
'use client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

type FormValues = {
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image: FileList;
};

export default function AddSchoolPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      setMsg(null);
     const fd = new FormData();

(['name','address','city','state','contact','email_id'] as const).forEach((k) => {
  fd.append(k, (data as FormData)[k]);
});

if ((data as FormDataType).image?.[0]) {
  fd.append('image', (data as FormData).image[0]);
}

      const res = await fetch('/api/schools', { method: 'POST', body: fd });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || 'Failed');
      setMsg('✅ School added successfully');
      reset();
    } catch (e: unknown) {
      setMsg('❌ ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{margin:"auto" , backgroundColor:"white", boxShadow:"0 0  5px 2px gray" , width:"400px" , borderRadius:"8px" , padding:"10px 20px" , boxSizing:"border-box"}}>
  <h2>Add School</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
        
          <div>
            <label>
              School Name
            </label>
            <div>
              <input
                style={{padding:"6px" , width:"90%"}}
                {...register('name', { required: 'School name is required' })}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
          </div>

          <div>
            <label>
              Address
            </label>
            <div>
              <textarea
                style={{padding:"6px" , width:"90%"}}

                rows={3}
                {...register('address', { required: 'Address is required' })}
              />
              {errors.address && <p>{errors.address.message}</p>}
            </div>
          </div>

          <div>
            <label>
              City
            </label>
            <div>
              <input
                  style={{padding:"6px" , width:"90%"}}
                {...register('city', { required: 'City is required' })}
              />
              {errors.city && <p>{errors.city.message}</p>}
            </div>
          </div>

          <div>
            <label>
              State
            </label>
            <div>
              <input
               style={{padding:"6px" , width:"90%"}}
                {...register('state', { required: 'State is required' })}
              />
              {errors.state && <p>{errors.state.message}</p>}
            </div>
          </div>

          <div>
            <label>
              Contact
            </label>
            <div>
              <input
                inputMode="numeric"
               style={{padding:"6px" , width:"90%"}}

                {...register('contact', {
                  required: 'Contact is required',
                  pattern: { value: /^\d{7,15}$/, message: 'Enter valid 7-15 digit number' },
                })}
              />
              {errors.contact && <p>{errors.contact.message}</p>}
            </div>
          </div>

          <div>
            <label>
              Email
            </label>
            <div>
              <input
                type="email"
               style={{padding:"6px" , width:"90%"}}

                {...register('email_id', {
                  required: 'Email is required',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter valid email' },
                })}
              />
              {errors.email_id && <p>{errors.email_id.message}</p>}
            </div>
          </div>

          <div>
            <label>
              School Image
            </label>
            <div>
              <input
                type="file"
                accept="image/*"
                {...register('image', { required: 'Image is required' })}
              />
              {errors.image && <p>{errors.image.message as unknown}</p>}
            </div>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
             style={{backgroundColor:"green" , color:"white" , padding:"5px 10px" , border:"none" , borderRadius:"5px" , marginTop:"5px"}}              
            >
              {loading ? 'Saving…' : 'Save School'}
            </button>
          </div>

          {msg && <p>{msg}</p>}
        </form>
      
    </div>
  );
}




