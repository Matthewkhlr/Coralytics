from __future__ import annotations

import unittest

from app.services.topic_service import assign_topics


class TopicServiceTests(unittest.TestCase):
    def test_fan_vote_post_is_entertainment_not_politics(self) -> None:
        post = {
            "id": "kpop-vote",
            "content": (
                "I vote for #KWONYURI @yulyulk from @girlsgeneration "
                "for #100mostbeautifulfaces2018 faces2018"
            ),
            "hashtags": ["KWONYURI", "100mostbeautifulfaces2018"],
        }

        topics = assign_topics([post])[0]["topics"]

        self.assertNotIn("politics", topics)
        self.assertIn("entertainment", topics)

    def test_real_political_post_still_tags_politics(self) -> None:
        post = {
            "id": "election",
            "content": (
                "I voted in the presidential election and hope the new "
                "policy passes Congress"
            ),
        }

        topics = assign_topics([post])[0]["topics"]

        self.assertIn("politics", topics)


if __name__ == "__main__":
    unittest.main()
