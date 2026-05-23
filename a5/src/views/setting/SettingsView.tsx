import { useState } from "react";
import { Button } from "@/components";
import { useUserContext } from "@/hooks/useUserContext";

const MOVIE_GENRES = [
  "Action", "Adventure", "Animation",
  "Crime", "Family", "Fantasy",
  "History", "Horror", "Mystery",
  "Sci-Fi"
];

const TV_GENRES = [
  "Action", "Animation", "Comedy",
  "Crime", "Documentary", "Drama",
  "Family", "Kids", "Mystery",
  "Sci-Fi"
];

  

export const SettingsView = () => {
  const { userName, setUserName, selectedMovies, setSelectedMovies, selectedTV, setSelectedTV } = useUserContext();
  const [value, setValue] = useState(userName);
  const [error, setError] = useState("");


  const handleMovieChange = (genre: string) => {
    setSelectedMovies(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]//check, delete, then add new group
    );
  };

  const handleTVChange = (genre: string) => {
    setSelectedTV(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <button
        className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
        onClick={() => window.history.back()}
      >
        Back
      </button>
      <h1 className="font-bold text-3xl">Settings</h1>
      <div className="max-w-md space-y-4 rounded-2xl border border-gray-700 bg-gray-900 p-6">
        <div>
          <h2 className="font-semibold text-lg">Profile</h2>
          <p className="text-gray-400 text-sm">Update your profile</p>
        </div>
        <div className="space-y-2">
          <label className="text-gray-300 text-sm">Username</label>
          <input
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(event) => {
              setValue(event.target.value);
              setError("");
            }}
            placeholder="Enter your name"
            type="text"
            value={value}
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={() => setValue(userName)} variant="grey">
            Reset
          </Button>
          <Button
            onClick={() => {
              const trimmed = value.trim();

              if (!trimmed) {
                setError("Username cannot be empty");
                return;
              } else {
                setUserName(trimmed);
                setError("");
              }
            }}
          >
            Save
          </Button>

        </div>
      </div>
        <div className="space-y-6 rounded-2xl border border-gray-700 bg-gray-900 p-6">
          <div>
            <h2 className="font-semibold text-lg">Preferences</h2>
            <p className="text-gray-400 text-sm">Choose genres you like</p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-sm text-gray-200">Movies</h3>
            <div className="grid grid-cols-3 gap-2">
              {MOVIE_GENRES.map((genre) => (
                <label key={genre} className="flex items-center space-x-2 text-sm text-gray-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                    checked={selectedMovies.includes(genre)}
                    onChange={() => handleMovieChange(genre)}
                  />
                  <span>{genre}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-sm text-gray-200">TV</h3>
            <div className="grid grid-cols-3 gap-2">
              {TV_GENRES.map((genre) => (
                <label key={genre} className="flex items-center space-x-2 text-sm text-gray-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                    checked={selectedTV.includes(genre)}
                    onChange={() => handleTVChange(genre)}
                  />
                  <span>{genre}</span>
                </label>
              ))}
            </div>
          </div>

        </div>
    </section>
  );
};
