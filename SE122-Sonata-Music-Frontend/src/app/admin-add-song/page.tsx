"use client";

import React, { useState, useEffect } from "react";
import { FolderPlus, UserIcon } from "lucide-react";
import * as Types from "../../../types/Types";
import axios from "axios";
import FileUploadSection from "./upload-file";
import { ADMIN_TOKEN } from "@/constant/adminToken";
import AdminLayout from "@/components/AdminLayout";
import ComboboxMultiSelect from "@/components/ComboboxMultiSelect";

const AddSongsPage = () => {
  const [description, setDescription] = useState("");
  const [songName, setSongName] = useState("");
  const [lyric, setLyric] = useState("");
  const [selectedPeriods, setSelectedPeriods] = useState<Types.Period[]>([]);
  const [selectedInstruments, setSelectedInstruments] = useState<
    Types.Instrument[]
  >([]);
  const [selectedGenres, setSelectedGenres] = useState<Types.Genre[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    Types.Category[]
  >([]);
  const [selectedArtists, setSelectedArtists] = useState<Types.ArtistDetails[]>(
    []
  );
  const [selectedAlbums, setSelectedAlbums] = useState<Types.Album[]>([]);

  const [musicFileUrl, setMusicFileUrl] = useState("");
  const [coverArtUrl, setCoverArtUrl] = useState("");
  const [quizzesData, setQuizzesData] = useState({
    content: "",
    answerA: "",
    answerB: "",
    answerC: "",
    answerD: "",
    correctAnswer: "A",
  });

  const [mediaId, setMediaId] = useState("");

  const handleUploadError = (error: string) => {
    console.error("Upload failed:", error);
    alert(`Upload failed: ${error}`);
  };

  const handleQuizChange = (field: string, value: string) => {
    setQuizzesData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    // remember to create function
    const fetchMediaId = async () => {
      try {
        const response = await axios.get(
          `https://api.sonata.io.vn/media-service/api/v1/media/media-id`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}`,
            },
          }
        );
        setMediaId(response.data.data.mediaId);
        console.log("Successfully get media ID.", response.data.data.mediaId);
      } catch (err) {
        console.log("Failed to get media ID: ", err);
      }
    };

    fetchMediaId();
  }, []); //use only once to get mediaId

  const handleAdd = async () => {
    const albumIds = selectedAlbums.map((album) => album.id);
    const genreIds = selectedGenres.map((genre) => genre.id);
    const instrumentIds = selectedInstruments.map(
      (instrument) => instrument.id
    );
    const periodIds = selectedPeriods.map((period) => period.id);
    const categoryIds = selectedCategories.map((category) => category.id);
    const artistIds = selectedArtists.map((artist) => artist.id);
    const composerIds = artistIds;

    const songData = {
      name: songName,
      mediaId,
      description,
      lyric,
      coverPhoto: coverArtUrl,
      resourceLink: musicFileUrl,
      albumIds,
      quizzes: [quizzesData],
      genreIds,
      instrumentIds,
      periodIds,
      categoryIds,
      artistIds,
      composerIds,
    };

    try {
      const response = await axios.post(
        "https://api.sonata.io.vn/api/v1/music",
        songData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert(`Song ${songName} added successfully!`);
        handleClear();
      } else {
        alert(`Error: ${response.data.message || "Failed to add artist"})`);
      }
    } catch (err) {
      console.error("Error adding artist:", err);
    }
  };

  const handleClear = () => {
    setDescription("");
    setSongName("");
    setLyric("");
    setSelectedPeriods([]);
    setSelectedInstruments([]);
    setSelectedGenres([]);
    setSelectedCategories([]);
    setSelectedArtists([]);
    setSelectedAlbums([]);
    setMusicFileUrl("");
    setCoverArtUrl("");
    setQuizzesData({
      content: "",
      answerA: "",
      answerB: "",
      answerC: "",
      answerD: "",
      correctAnswer: "A",
    });
  };

  return (
    <AdminLayout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Songs Management
            </h1>
            <p className="text-gray-600">
              Add and organize your music collection
            </p>
          </div>
          <div className="flex items-center justify-between mb-6">
            {/* tab sections */}
            <div className="flex items-center gap-4">
              <button className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium text-sm">
                <span className="text-lg">+</span>
                Add Songs
              </button>
              <a
                href="../admin-add-albums"
                className="bg-white hover:bg-blue-400  text-gray-600 px-4 py-2.5 rounded-lg flex items-center gap-2 border border-gray-300 shadow-sm text-sm"
              >
                <FolderPlus className="w-4 h-4" />
                Add Albums
              </a>
              <a
                href="../admin-view-all"
                className="bg-white hover:bg-blue-400  text-gray-600 px-4 py-2.5 rounded-lg flex items-center gap-2 border border-gray-300 shadow-sm text-sm"
              >
                <UserIcon className="w-4 h-4" />
                All
              </a>

              <a
                href="../admin-approve-music"
                className="bg-white hover:bg-blue-400  text-gray-600 px-4 py-2.5 rounded-lg flex items-center gap-2 border border-gray-300 shadow-sm text-sm"
              >
                <UserIcon className="w-4 h-4" />
                Approve music
              </a>
            </div>
          </div>

          {/* main sections */}
          <div className="flex justify-between gap-5 ">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-6">Filter</h2>
              <div className="grid grid-cols-4 gap-12 mb-8">
                {/* Category Name */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-800 mb-3">
                      Category Name
                    </h3>
                    <ComboboxMultiSelect
                      fieldType="category"
                      selectedItems={selectedCategories}
                      onSelect={(items) => setSelectedCategories(items as Types.Category[])}
                      placeholder="Search categories..."
                    />
                  </div>
                </div>

                {/* Artists Name */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-800 mb-3">
                      Artists Name
                    </h3>
                    <ComboboxMultiSelect
                      fieldType="artist"
                      selectedItems={selectedArtists}
                      onSelect={(items) => setSelectedArtists(items as Types.ArtistDetails[])}
                      placeholder="Search artists..."
                    />
                  </div>
                </div>

                {/* Composer */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-800 mb-3">
                      Composer
                    </h3>
                    <ComboboxMultiSelect
                      fieldType="composer"
                      selectedItems={selectedArtists}
                      onSelect={(items) => setSelectedArtists(items as Types.ArtistDetails[])}
                      placeholder="Search composers..."
                    />
                  </div>
                </div>
                {/* Song Name */}
                <div className="text-black">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-sm font-medium text-gray-800">
                        Song name
                      </h3>
                    </div>
                    <textarea
                      value={songName}
                      onChange={(e) => setSongName(e.target.value)}
                      className="w-full h-20 p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder=""
                    />
                  </div>
                </div>
                {/* Genre */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-800 mb-3">
                      Genre
                    </h3>
                    <ComboboxMultiSelect
                      fieldType="genre"
                      selectedItems={selectedGenres}
                      onSelect={(items) => setSelectedGenres(items as Types.Genre[])}
                      placeholder="Search genres..."
                    />
                  </div>
                </div>

                {/* Musical Period */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-800 mb-3">
                      Musical Period
                    </h3>
                    <ComboboxMultiSelect
                      fieldType="periods"
                      selectedItems={selectedPeriods}
                      onSelect={(items) => setSelectedPeriods(items as Types.Period[])}
                      placeholder="Search periods..."
                    />
                  </div>
                </div>

                {/* Instrument Played */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-800 mb-3">
                      Instrument
                    </h3>
                    <ComboboxMultiSelect
                      fieldType="instruments"
                      selectedItems={selectedInstruments}
                      onSelect={(items) => setSelectedInstruments(items as Types.Instrument[])}
                      placeholder="Search instruments..."
                    />
                  </div>
                </div>

                {/* Albums */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-800 mb-3">
                      Album
                    </h3>
                    <ComboboxMultiSelect
                      fieldType="album"
                      selectedItems={selectedAlbums}
                      onSelect={(items) => setSelectedAlbums(items as Types.Album[])}
                      placeholder="Search albums..."
                    />
                  </div>
                </div>
                {/* Description */}
                <div className="col-span-2 text-black">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-sm font-medium text-gray-800">
                        Description
                      </h3>
                    </div>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full h-20 p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder=""
                    />
                  </div>
                </div>
                {/* Lyric */}
                <div className="col-span-2 text-black">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-sm font-medium text-gray-800">
                        Lyric
                      </h3>
                    </div>
                    <textarea
                      value={lyric}
                      onChange={(e) => setLyric(e.target.value)}
                      className="w-full h-20 p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder=""
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-12">
                <div>
                  <FileUploadSection
                    title="Upload Music File"
                    acceptedFormats="Accepted formats: MP3, WAV, FLAC"
                    acceptTypes=".mp3,.wav,.flac"
                    fileType="music"
                    mediaId={mediaId}
                    uploadedUrl={musicFileUrl}
                    onUploadSuccess={(mediaUrl) => setMusicFileUrl(mediaUrl)}
                    onUploadError={handleUploadError}
                  />
                </div>
                <div>
                  <FileUploadSection
                    title="Upload Cover Art"
                    acceptedFormats="JPG, PNG files, max 10MB each"
                    acceptTypes="image/*,.jpg,.jpeg,.png"
                    fileType="cover"
                    uploadedUrl={coverArtUrl}
                    onUploadSuccess={(mediaUrl) => setCoverArtUrl(mediaUrl)}
                    onUploadError={handleUploadError}
                  />
                </div>
              </div>
            </div>
            {/* quizzes */}
            <div className="flex flex-col items-end gap-4 justify-between mt-15 ">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">
                  Quiz Questions
                </h3>
                <form className="space-y-4 w-80 text-black">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Question
                    </label>
                    <input
                      name="content"
                      value={quizzesData.content}
                      onChange={(e) =>
                        handleQuizChange("content", e.target.value)
                      }
                      placeholder="Enter your question"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">
                        Answer A
                      </label>
                      <input
                        name="answerA"
                        value={quizzesData.answerA}
                        onChange={(e) =>
                          handleQuizChange("answerA", e.target.value)
                        }
                        placeholder="Option A"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">
                        Answer B
                      </label>
                      <input
                        name="answerB"
                        value={quizzesData.answerB}
                        onChange={(e) =>
                          handleQuizChange("answerB", e.target.value)
                        }
                        placeholder="Option B"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">
                        Answer C
                      </label>
                      <input
                        name="answerC"
                        value={quizzesData.answerC}
                        onChange={(e) =>
                          handleQuizChange("answerC", e.target.value)
                        }
                        placeholder="Option C"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">
                        Answer D
                      </label>
                      <input
                        name="answerD"
                        value={quizzesData.answerD}
                        onChange={(e) =>
                          handleQuizChange("answerD", e.target.value)
                        }
                        placeholder="Option D"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Correct Answer
                    </label>
                    <select
                      name="correctAnswer"
                      value={quizzesData.correctAnswer}
                      onChange={(e) =>
                        handleQuizChange("correctAnswer", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                    >
                      <option value="A">Answer A</option>
                      <option value="B">Answer B</option>
                      <option value="C">Answer C</option>
                      <option value="D">Answer D</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="flex gap-5">
                <button className="px-6 w-40 h-10 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors bg-white">
                  Clear
                </button>
                <button
                  onClick={handleAdd}
                  className="px-6 w-40 h-10 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddSongsPage;
