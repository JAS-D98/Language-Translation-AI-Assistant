"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  language: "",
  translation: "",
};

const page = () => {
  const [loading, setLoading] = useState(false);
  const [translation, setTranslation] = useState("");

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: Yup.object({
      translation: Yup.string()
        .min(3)
        .required("Please enter a word you wish to have translated"),
      language: Yup.string().required("Please select a language"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post("/api/openai", values);

        if (response?.data?.result) {
          toast.success("Translation successful!");
          setTranslation(response.data.result);
        } else {
          toast.error("An error occurred. Please try again...");
        }
      } catch (error) {
        toast.error("Error while fetching translation");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="w-full min-h-screen bg-slate-50 flex items-center justify-between">
      <div className="w-full min-h-96 md:w-[40%] md:mx-auto shadow border-gray-400 flex flex-col items-center space-y-4">
        <div className="w-full h-80 object-cover overflow-hidden">
          <Image
            src="/worldmap.png"
            width={600}
            height={600}
            alt="logo"
            className="object-cover w-full h-full"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center space-y-4 w-full px-4"
        >
          <h1 className="text-blue-600 font-bold text-xl md:text-2xl">
            Text to Translate <span>👇</span>
          </h1>
          <div className="w-full">
            <label htmlFor="translation">Translation Text</label>
            <textarea
              name="translation"
              id="translation"
              placeholder="Enter your translation here"
              className="outline-none bg-slate-200 w-full min-h-12 rounded-md p-4 font-medium text-gray-700"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.translation}
            ></textarea>
            {errors.translation && touched.translation && (
              <small className="text-red-500">{errors.translation}</small>
            )}
          </div>

          <div className="flex flex-col justify-between gap-3 w-full">
            <div className="flex flex-row gap-2 justify-start w-full items-center text-left">
              <input
                type="radio"
                name="language"
                id="french"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue("language", e.target.value);
                }}
                onBlur={handleBlur}
                value="french"
                className="text-gray-800"
              />
              <label htmlFor="french" className="flex items-center gap-2">
                French{" "}
                <Image
                  width={100}
                  height={100}
                  src="/french.png"
                  alt="France flag"
                  className="w-4 h-4"
                />
              </label>
            </div>
            {errors.language && touched.language && (
              <small className="text-red-500">{errors.language}</small>
            )}

            <div className="flex flex-row gap-2 justify-start w-full items-center text-left">
              <input
                type="radio"
                name="language"
                id="spanish"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue("language", e.target.value);
                }}
                onBlur={handleBlur}
                value="spanish"
                className="text-gray-800"
              />
              <label htmlFor="spanish" className="flex items-center gap-2">
                Spanish{" "}
                <Image
                  width={100}
                  height={100}
                  src="/spanish.png"
                  alt="Spain flag"
                  className="w-4 h-4"
                />
              </label>
            </div>

            <div className="flex flex-row gap-2 justify-start w-full items-center text-left">
              <input
                type="radio"
                name="language"
                id="japanese"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue("language", e.target.value);
                }}
                onBlur={handleBlur}
                value="japanese"
                className="text-gray-800"
              />
              <label htmlFor="japanese" className="flex items-center gap-2">
                Japanese{" "}
                <Image
                  width={100}
                  height={100}
                  src="/japanese.png"
                  alt="Japan flag"
                  className="w-4 h-4"
                />
              </label>
            </div>
          </div>

          {translation && (
            <div className="bg-slate-200 w-full min-h-12 rounded-md p-4 font-medium text-gray-700">
              <strong>Translation: </strong> {translation}
            </div>
          )}

          {loading && (
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 border-4 border-t-4 border-gray-600 border-dashed rounded-full animate-spin"></div>
              <span>Submitting translation, please wait...</span>
            </div>
          )}

          <div className="w-full mb-4">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold w-full"
              disabled={loading}
            >
              Translate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
