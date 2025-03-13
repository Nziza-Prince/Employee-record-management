import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Button } from "@radix-ui/themes";
  import { Label } from "@radix-ui/themes/components/context-menu";
  import { SubmitHandler, useForm } from "react-hook-form";
  import { recordSchema, RecordSchema } from "../../utils/validation/form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import axios from "axios";
  import { useEffect, useState } from "react";
  import { FaPen } from "react-icons/fa";
  
interface Props{
    id:string
}

interface Record{
    _id:string
    firstname:string
    lastname:string
    email:string
    phone:string
    role:string
  }

  export function UpdateComponent({setRecords,id}:{setRecords:Function, id:string}) {
  const [open,setOpen] = useState(false)
  const [emailError,setEmailError] = useState(null)
  const [recordToUpdate,setRecordToUpdate] = useState<RecordSchema>(Object)
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const form = useForm<RecordSchema>({
      resolver: zodResolver(recordSchema),
      defaultValues: { role: "STAFF" },
    });
  
    const {
      register,
      handleSubmit,
      setValue,
      reset,
      formState: { errors, isSubmitting },
    } = form;
  
    useEffect(() => {
        if (open) {
          const fetchRecord = async () => {
            try {
              const response = await axios.get(`${backendUrl}/records/${id}`);
              const record = response.data.data;
              setRecordToUpdate(record);
    
              // Set form values with the fetched record
              setValue("firstname", record.firstname);
              setValue("lastname", record.lastname);
              setValue("email", record.email);
              setValue("phone", record.phone);
              setValue("role", record.role);
            } catch (error) {
              console.error("Error fetching record:", error);
            }
          };
    
          fetchRecord();
        }
      }, [open, id, setValue]);

    const onSubmitForm: SubmitHandler<RecordSchema> = async (
      data: RecordSchema
    ) => {
      try {
        const response = await axios.put(
          `${backendUrl}/records/${id}`,
          data
        );
        if (!response) {
          throw new Error("Failed to submit the form");
        }
        setRecords((prevRecords: Record[]) =>
            prevRecords.map((record) =>
              record._id === id ? response.data.data : record
            )
          );
        setOpen(false)
        reset()
        setEmailError(null)
      } catch (error:any) {
        if(error.response && error.response.status===400 && error.response.data.error === "Record Already exists"){
         setEmailError(error.response.data.error)
        }
        console.error(error);
      }
    };
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <FaPen className="cursor-pointer"/>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Create New Record</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmitForm)}>
            <div className="flex flex-col">
              <Label className="text-right">First Name</Label>
              <input
                {...register("firstname")}
                id="firstname"
                className="focus:outline-none col-span-3 border border-gray-400 mt-2 indent-4 py-1 rounded-md"
                autoFocus
                
              />
              <p className="text-red-600">
                {errors.firstname && errors.firstname.message}
              </p>
            </div>
            <div className="flex flex-col">
              <Label className="text-right">Last Name</Label>
              <input
                {...register("lastname")}
                id="lastname"
                className="focus:outline-none col-span-3 border border-gray-400 mt-2 indent-4 py-1 rounded-md"
              />
              <p className="text-red-600">
                {errors.lastname && errors.lastname.message}
              </p>
            </div>
            <div className="flex flex-col">
              <Label className="text-right">Email</Label>
              <input
                {...register("email")}
                id="email"
                className="focus:outline-none col-span-3 border border-gray-400 mt-2 indent-4 py-1 rounded-md"
                type="email"
              />
              <p className="text-red-600">
                {errors.email && errors.email.message}
              </p>
              <p className="text-red-600">
                {emailError && emailError}
              </p>
            </div>
            <div className="flex flex-col">
              <Label className="text-right">Phone</Label>
              <input
                {...register("phone")}
                id="phone"
                className="focus:outline-none col-span-3 border border-gray-400 mt-2 indent-4 py-1 rounded-md"
              />
              <p className="text-red-600">
                {errors.phone && errors.phone.message}
              </p>
            </div>
            <div>
              <select
                {...register("role")}
                name=""
                id=""
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold focus:outline-none text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
              >
                <option
                  className="block px-4 py-2 text-sm text-gray-700"
                  value="role"
                  disabled
                >
                  Role
                </option>
                <option
                  className="block px-4 py-2 text-sm text-gray-700"
                  value="ADMIN"
                >
                  Admin
                </option>
                <option
                  className="block px-4 py-2 text-sm text-gray-700"
                  value="STAFF"
                >
                  Staff
                </option>
              </select>
              <p className="text-red-600">{errors.role && errors.role.message}</p>
            </div>
            <DialogFooter>
              <button
                className="hover:bg-green-600 cursor-pointer bg-green-400 p-2 text-gray-100 rounded-md flex gap-2"
                type="submit"
              >
                {isSubmitting && 
  
                <span className="relative flex size-3 mt-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex size-3 rounded-full bg-white"></span>
                </span>
   }Save Changes
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
  
  export default UpdateComponent;
  